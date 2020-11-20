const moduleEdit = {
    state: {
        isEditwhich: -1,    // 正在编辑哪块tab内容
    },
    mutations: {
        changeEditInfo(state, payload) {
            state.isEditwhich = payload
        }
    }
}

export default moduleEdit
