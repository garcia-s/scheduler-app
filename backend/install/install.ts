import { PostgresDataSource } from "../datasources";
import NewGroupDTO from "../modules/access_control/application/dto/new_group_dto";
import { GroupRepository } from "../modules/access_control/application/repo_impl/group_repository_impl";
import { CreateGroup } from "../modules/access_control/application/use_cases/create_group";

(async () => {
  await PostgresDataSource.initialize();
  const schedulingAccessGroup: NewGroupDTO = {
    name: "superuser",
    policies: [
      {
        action: "*",
        objectId: "*",
        objectOwner: "*",
        objectType: "service",
      },
    ],
  };

  const createGroup = new CreateGroup(new GroupRepository());
  await createGroup.execute(schedulingAccessGroup);

})();
