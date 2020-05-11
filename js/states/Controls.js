const state = {
  controlBar: undefined
}

const setCtrlState = id => {
  state.controlBar = id
}

/**
 * @returns {Number}
 */
const getCtrlState = () => state.controlBar

export const getters = {
  getCtrlState
}

export const mutations = {
  setCtrlState
}