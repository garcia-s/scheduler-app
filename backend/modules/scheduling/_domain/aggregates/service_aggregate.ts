import Aggregate from "../../../../core/interfaces/aggregate"
import { ServiceEntity } from "../entities/service";

export default class ServiceAggregate extends Aggregate {
    constructor(params:{id: string}) {
        super(params.id);
    }
}