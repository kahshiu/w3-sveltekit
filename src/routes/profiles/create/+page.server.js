import { camelCase } from "es-toolkit";

export const load = ({ params }) => {
    const { entityPrimaryType } = params
    return {
        entityPrimaryType
    };
};

const populatePayload = (obj, transform) => {
    const payload = {};
    for (const key in transform) {
        let v = obj.get(key);
        const transformer = transform[key];
        if(transformer) {
            v = transformer(v);
        }
        const k = camelCase(key);
        payload[k] = v;
    }
    return payload;
}

export const actions = {
    "create-entity": async ({ request }) => {
        const data = await request.formData();
        const payload = populatePayload(data, {
            "entity-class": Number,
            "entity-primary-type": Number,
            "entity-secondary-type": Number,
            "entity-name": null,
            "entity-status": Number,
        });

        return { success: true };
    }
}