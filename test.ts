// Manual data types
type Pizza = {
    id: number
    name: string
    price: number
}

type Order = {
    id: number
    pizza: Pizza
    status: 'ordered' | 'completed'
}

const menu: Pizza[] = [
    { id: 1, name: 'Pepperoni', price: 15 },
    { id: 2, name: 'Margherita', price: 10 },
]

// Variable that use to edit need to be declared as let
// const in other name is a constant variable or readonly variable
let cashInRegister: number = 100
let nextOrderId: number = 1
const orderQueue: Order[] = []

const addNewPizza = (pizzaObj: Pizza) => {
    menu.push(pizzaObj)
}

const placeOrder = (pizzaName: string) => {
    // Triple equals is used to check if the value and type are the same
    // If double equals is used, it will only check the value are the same
    const selectedPizza = menu.find((pizza) => pizza.name === pizzaName)

    // Always check if variable exits after using some method
    if (!selectedPizza) {
        console.error(`${pizzaName} does not exist in the menu`)
        return
    }

    cashInRegister += selectedPizza.price
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: 'ordered' }

    orderQueue.push(newOrder)

    return newOrder
}

const completeOrder = (orderId: number): Order => {
    const order = orderQueue.find((order) => order.id === orderId)

    // Always check if variable exits after using some method
    if (!order) {
        console.error(`${orderId} does not exist in the order queue`)
        return
    }

    order.status = 'completed'

    return order
}

export const getPizzaDetail = (identifier: string | number): Pizza => {
    if (typeof identifier === 'number') {
        return menu.find((pizza) => pizza.id === identifier)
    } else if (typeof identifier === 'string') {
        return menu.find((pizza) => pizza.name.toLowerCase() === identifier.toLowerCase())
    } else {
        throw new TypeError('Invalid identifier')
    }
}

addNewPizza({ id: 3, name: 'Hawaiian', price: 20 })
addNewPizza({ id: 4, name: 'Veggie', price: 18 })
addNewPizza({ id: 5, name: 'Meat Feast', price: 22 })

placeOrder('Pepperoni')
completeOrder(1)

console.log('Order queue:', menu)
console.log('Cash in register:', cashInRegister)
console.log('Order queue:', orderQueue)
