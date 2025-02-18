import { store } from "$lib/const/store.js";
import { fail, redirect } from "@sveltejs/kit";
import { camelCase } from "es-toolkit";

export const load = ({ params }) => {
    // redirect(307, '/profiles');
    /*
    const { entityTypePrimary } = params
    return {
        entityTypePrimary
    };
    */
};

const populatePayload = (obj, transform) => {
    const payload = {};
    for (const key in transform) {
        let v = obj.get(key);
        const transformer = transform[key];
        if (transformer) {
            v = transformer(v);
        }
        const k = camelCase(key);
        payload[k] = v;
    }
    return payload;
}

const targetKeys = {
    entityKeys: [
        "entityId"
        , "entityName"
        , "entityClass"
        , "entityTypePrimary"
        , "entityTypeSecondary"
        , "entityStatus"
    ],
    companyKeys: [
        "coRegNoOld"
        , "coRegNoNew"
        , "employerNo"
        , "dateIncorp"
        , "dateCommence"
        , "yearEndMonth"
        , "arDueMonth"
        , "directorName"
        , "directorPassword"
    ],
    personKeys: [
        "icType"
        , "icNo"
    ],
    clientKeys: [
        "incomeTaxNo"
        , "incomeTaxBranch"
        , "profileStatus"
    ]
}

const collectKeys = (data) => {
    const { entityClass, entityTypePrimary } = data;

    const keys = [...targetKeys.entityKeys];
    if (entityTypePrimary == store.entityTypePrimary.COMPANY) keys.push(...targetKeys.companyKeys);
    if (entityTypePrimary == store.entityTypePrimary.PERSON) keys.push(...targetKeys.personKeys);
    if (entityClass == store.entityClass.CLIENT) keys.push(...targetKeys.clientKeys);
    if (entityClass == store.entityClass.MASTER) keys.push(...targetKeys.clientKeys);
    return keys;
}

export const actions = {
    "create-entity": async ({ request }) => {
        const data = await request.formData();
        const payload = populatePayload(data, {
            "entity-class": Number,
            "entity-type-primary": Number,
            "entity-type-secondary": Number,
            "entity-name": null,
            "entity-status": Number,

            "co-reg-no-old": null,
            "co-reg-no-new": null,
            "employer-no": null,
            "date-incorp": (v0) => {
                if (v0) return new Date(`${v0} 00:00:00.00`)
                return null;
            },
            "date-commence": (v0) => {
                if (v0) return new Date(`${v0} 00:00:00.00`)
                return null;
            },
            "year-end-month": Number,
            "ar-due-month": Number,
            "director-name": null,
            "director-password": null,

            "ic-type": Number,
            "ic-no": null,

            "income-tax-no": null,
            "income-tax-branch": null,
            "profile-status": Number,
        });
        payload.relatedParents = []
        payload.relatedChildren = []

        const url = "http://localhost:3000/api/entity"

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const { status, statusText } = response;
            return fail(500, { statusText, status });
        }

        const result = await response.json();
        const redirectUrl = `/profiles/${result.payload.entityId}`

        redirect(303, redirectUrl);
        return { success: true };
    }
}