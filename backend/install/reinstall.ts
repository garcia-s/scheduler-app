import ResourceModel from "../modules/auth/application/models/resource_model";
import ResourceTypeModel from "../modules/auth/application/models/resource_type_model";
import UserModel from "../modules/auth/application/models/user_model";
import UserPolicyModel from "../modules/auth/application/models/user_policy";

(async () => {
  try {
    UserModel.sync()
  } catch (e) {
    console.log(e);
  }
})();
