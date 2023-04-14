import {useDispatch} from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {authActions} from "../store/auth/auth.slice";
import {cvActions} from "../store/cv/cv.slice";

const actions = {
  ...authActions,
  ...cvActions
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}