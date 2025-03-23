import { Request, Response, NextFunction } from "express";
import UserRole from "../models/UserRole";
import RolePermission from "../models/RolePermission";
import { JwtPayload } from "jsonwebtoken";

// Define interfaces for UserRole and RolePermission
interface UserRoleInstance {
  userId: number;
  roleId: number;
}

interface RolePermissionInstance {
  roleId: number;
  permissionId: number;
}

// Extend the Request interface to include user information
interface CustomRequest extends Request {
  user?: { id: number } | JwtPayload; // Adjust this type based on your JWT payload structure
}

const rbac = (permission: string) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId =
      req.user && typeof req.user === "object" && "id" in req.user
        ? req.user.id
        : null;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" }); // Handle undefined user
    }

    // Fetch user roles and map to UserRoleInstance
    const userRoles = await UserRole.findAll({ where: { userId } });
    const userRoleInstances: UserRoleInstance[] = userRoles.map((userRole) => ({
      userId: userRole.userId,
      roleId: userRole.roleId,
    }));

    const roleIds = userRoleInstances.map((userRole) => userRole.roleId);

    // Fetch role permissions and map to RolePermissionInstance
    const permissions = await RolePermission.findAll({
      where: { roleId: roleIds },
    });
    const rolePermissionInstances: RolePermissionInstance[] = permissions.map(
      (rolePermission) => ({
        roleId: rolePermission.roleId,
        permissionId: rolePermission.permissionId,
      })
    );

    const userPermissions = rolePermissionInstances.map(
      (rolePermission) => rolePermission.permissionId
    );

    if (userPermissions.includes(+permission)) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  };
};

export default rbac;
