import { User, UserProfile, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { config } from "../../config";
import AppError from "../../errors/AppError";
import { generateToken } from "../../utils/generateToken";
import { prisma } from "../../utils/prisma";

interface UserWithProfile extends User {
  profile: UserProfile;
}

// create a new user
const createUserIntoDB = async (user: UserWithProfile) => {
  const { profile, ...userData } = user;

  // check if user already exists
  const existingUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: userData.email,
    },
  });

  if (existingUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }

  // hash the password
  const hashPassword = await bcrypt.hash(userData.password, config.salt_round);

  return prisma.$transaction(async (tx) => {
    const newUser = await tx.user.create({
      data: {
        ...userData,
        password: hashPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (profile) {
      await tx.userProfile.create({
        data: {
          ...profile,
          userId: newUser.id,
        },
      });
    }

    return newUser;
  });
};

// login a user into the system
const loginUser = async (email: string, password: string) => {
  const user: any = await prisma.user.findUnique({
    where: {
      email,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  // generate token
  const token = generateToken(
    { id: user.id, email: user.email, role: user.role },
    config.jwt_secret as Secret,
    config.expiresIn
  );
  const { password: _, ...userWithoutPassword } = user;

  return { ...userWithoutPassword, token };
};

// get user profile
const getUserProfile = async (userId: string) => {
  return prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      role: true,
    },
  });
};

// update user profile
const updateUserProfile = async (userId: string, profile: Partial<User>) => {
  const { password, ...userWithoutPassword } = profile;

  if (password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Password cannot be updated here"
    );
  }

  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
  });

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: userWithoutPassword,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// change user password
const changeUserPassword = async (
  userId: string,
  { oldPassword, newPassword }: { oldPassword: string; newPassword: string }
) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      password: true,
    },
  });

  const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const hashPassword = await bcrypt.hash(newPassword, config.salt_round);

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashPassword,
    },
  });
};

// soft delete a user
const deleteUser = async (userId: string) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
  });

  return prisma.user.update({
    where: {
      id: userId,
      status: UserStatus.ACTIVE,
    },
    data: {
      isDeleted: true,
    },
  });
};

// update user status
const updateUserStatus = async (userId: string, status: UserStatus) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
    },
  });
};

// export user service
export const UserService = {
  createUserIntoDB,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changeUserPassword,
  deleteUser,
  updateUserStatus,
};
