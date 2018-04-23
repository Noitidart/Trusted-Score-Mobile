type Navigate = string => void
type GoBack = void => void
type SetParams = ({}) => void

type Navigation = {
    navigate: Navigate,
    goBack: GoBack,
    setParams: SetParams,
    state: {
        routes: { key:string }[],
        state: key
    }
}
