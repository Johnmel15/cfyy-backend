import { Request, Response, NextFunction } from "express";
import { UserRole, RolePermission, Permission, Role } from "../models"; // Adjust the import based on your structure
import jwt, { JwtPayload } from "jsonwebtoken";

const authorize = (requiredPermission: string) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Assuming Bearer token

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return; // Ensure to return after sending a response
    }

    let decoded: JwtPayload | string;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!); // Use your secret
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
      return; // Ensure to return after sending a response
    }

    // Check if decoded is a JwtPayload and has an id
    if (typeof decoded === "string" || !decoded.id) {
      res.status(401).json({ message: "Unauthorized" });
      return; // Ensure to return after sending a response
    }

    const userId = decoded.id; // Now TypeScript knows userId is a number

    // Fetch user roles
    const userRoles = await UserRole.findAll({
      where: { userId },
      include: [{ model: Role }],
    });

    // Fetch permissions for the user's roles
    const permissions = await RolePermission.findAll({
      where: {
        roleId: userRoles.map((userRole) => userRole.roleId),
      },
      include: [{ model: Permission }], // Include the Permission model
    });

    // Check if the user has the required permission
    const hasPermission = permissions.some(
      (rolePermission) => rolePermission.permissionId === +requiredPermission // Check against action
    );

    if (!hasPermission) {
      res.status(403).json({ message: "Forbidden" });
      return; // Ensure to return after sending a response
    }

    // Call next() to pass control to the next middleware or route handler
    next();
  };
};

export default authorize;
