import { AccessRequest } from "../../_domain/value_objects/access_request";
import { AccessRequestAttribute } from "../../_domain/value_objects/request_attribute";
import AccessRequestDTO from "../dto/access_request_dto";

export default abstract class AccessRequestMap {
  public static fromDTOToValueObject(dto: AccessRequestDTO): AccessRequest {
    return AccessRequest.create({
      action: dto.action,
      attributes: dto.attributes.map((attr) =>
        AccessRequestAttribute.create(attr)
      ),
    });
  }
}
