export const shop_items = [
    {
        name: "Queen Residence",
        description: "Allows new ants to be born.",
        price: 5,
        max_count: 1,
    },
    {
        name: "Food storage",
        description: "Increases the maximum amount of food that can be stored.",
        price: 15,
        max_count: 100,
    },
    {
        name: "Ant den",
        description: "Increaeses the amount of ants allowed in the colony.",
        price: 5,
        max_count: 100,
    },
]

export function get_shop_item_by_name(name) {
    for (const item of shop_items) {
        if (item.name === name) {
            return item;
        }
    }
}