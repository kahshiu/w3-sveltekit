import { camelCase } from "es-toolkit";

export const load = ({ params }) => {
    const { entityTypePrimary } = params
    return {
        entityTypePrimary
    };
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

export const actions = {
    "create-entity": async ({ request }) => {
        const data = await request.formData();
        const payload = populatePayload(data, {
            "entity-class": Number,
            "entity-type-primary": Number,
            "entity-type-secondary": Number,
            "entity-name": null,
            "entity-status": Number,
            "profile-status": Number,
        });
        payload.relatedParents = []
        payload.relatedChildren = []

        const url = "http://localhost:3000/api/entity"

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { data, success: true };

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
}