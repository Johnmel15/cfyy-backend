import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User"; // Make sure User model is correctly imported
import { Permission, Role, RolePermission, UserRole } from "../models";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Fetch user roles
    const userRoles = await UserRole.findAll({
      where: { userId: user.id },
      include: [{ model: Role }],
    });

    // Fetch permissions for the user's roles
    const roleIds = userRoles.map((userRole) => userRole.roleId);
    const rolePermissions = await RolePermission.findAll({
      where: { roleId: roleIds },
      include: [{ model: Permission }],
    });

    // Format roles and permissions
    const rolesWithPermissions = userRoles.map((userRole) => {
      const role = userRole.Role; // This should now work without errors
      const permissions = rolePermissions
        .filter((rolePermission) => rolePermission.roleId === role?.id)
        .map((rolePermission) => rolePermission.Permission); // Accessing the Permission instance

      return {
        role: role?.name, // Assuming role has a name property
        permissions: permissions.map((perm) => perm?.action), // Extracting action from permission
      };
    });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Send response with user info, token, and roles with permissions
    res.status(200).json({
      message: "Login successful",
      token,
      user,
      roles: rolesWithPermissions,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
