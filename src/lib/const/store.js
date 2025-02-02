// global store
export const store = {
    entityClass: {
        CLIENT: 2,
        SERVICE_PROVIDER: 3,
        MASTER: 1
    },
    entityTypePrimary: {
        COMPANY: 1,
        PERSON: 2
    },
    entityStatus: {
        ACTIVE: 11,
        DORMANT: 101,
        STRIKE_OFF: 102
    },
    companyType: {
        NOT_SELECTED: 0,
        SOLE_PROP: 101,
        PARTNERSHIP: 102,
        SDN_BHD: 103,
        LIMITED_LIABILITY_PARTNERSHIP: 104
    },
    icType: {
        NEW_IC: 1,
        OLD_IC: 2
    },
    profileStatus: {
        EMPTY: 0,
        PRE_ACTIVATION: 1,
        ACTIVE: 11,
        RESIGNED: 101
    }
};