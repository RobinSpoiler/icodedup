import { useDispatch, useSelector } from "react-redux"
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"

export const MindScript = () => {

  // const { counter } = useSelector(state => state.counter);
  // const dispatch = useDispatch();

  return (
    <AppTheme>
      < AppRouter />
    </AppTheme>
  )
}
