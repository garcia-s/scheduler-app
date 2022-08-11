import { Result } from "ts-results";
import { UnimplementedError } from "../../../../core/errors/general";
import Failure from "../../../../core/interfaces/failure";
import { AccessPolicy } from "../../domain/entities/access/access_policy";
import AccessPolicyDTO from "../dto/access_policy_dto";

export abstract class AccessPolicyCollectionMap {
  public static fromEntityToDTO(policies: AccessPolicy[]): AccessPolicyDTO[] {
   throw new UnimplementedError();
  }

  public static fromDTOsToEntities(
    policies: AccessPolicyDTO[]
  ): AccessPolicy[] {
    throw new UnimplementedError();
  }
}
