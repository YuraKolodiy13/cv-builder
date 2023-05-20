import {useDispatch} from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {authActions} from "../store/auth/auth.slice";
import {commonActions} from "../store/common/common.slice";

const actions = {
  ...authActions,
  ...commonActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}