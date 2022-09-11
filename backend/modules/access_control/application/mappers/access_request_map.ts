import { AccessRequest } from "../../_domain/value_objects/access_request";
import AccessRequestDTO from "../dto/access_request_dto";

export default abstract class AccessRequestMap {
    public static fromDTOToValueObject(dto: AccessRequestDTO) : AccessRequest {
        return AccessRequest.create(dto);
    }
} 