import { PostgresDataSource } from "../datasources";
import NewGroupDTO from "../modules/access_control/application/dto/new_group_dto";
import { GroupRepository } from "../modules/access_control/application/repo_impl/group_repository";
import { CreateGroup } from "../modules/access_control/application/use_cases/create_group";

(async () => {
  await PostgresDataSource.initialize();
  const schedulingAccessGroup: NewGroupDTO = {
    name: "client_schedule",
    policies: [
      {
        action: "create",
        objectId: "*",
        objectOwner: "!",
        objectType: "appointment",
      },
      {
        action: "read",
        objectId: "*",
        objectOwner: "!",
        objectType: "appointment",
      },
      {
        action: "update",
        objectId: "*",
        objectOwner: "!",
        objectType: "appointment",
      },
    ],
  };

  const createGroup = new CreateGroup(new GroupRepository());
  const response = await createGroup.execute(schedulingAccessGroup);
  console.log(response);
})();
