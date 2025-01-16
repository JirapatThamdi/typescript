// Manual data types
type Pizza = {
    id?: number
    name: string
    price: number
}

// type PizzaUpdate = {
//     id?: number
//     name?: string
//     price?: number
// }

// Utility type
// Partial is used to make all the properties in the type 'optional'
// Required is used to make all the properties in the type 'required'
type PizzaUpdate = Partial<Pizza>

type Order = {
    id: number
    pizza: Pizza
    status: 'ordered' | 'completed'
}

// Variable that use to edit need to be declared as let
// const in other name is a constant variable or readonly variable
let cashInRegister: number = 100
let nextOrderId: number = 1
let nextPizzaId: number = 1
const orderQueue: Order[] = []

const menu: Pizza[] = [
    { id: nextPizzaId++, name: 'Pepperoni', price: 15 },
    { id: nextPizzaId++, name: 'Margherita', price: 10 },
]

// Void is used when the function does not return anything
const addNewPizza = (pizzaObj: Pizza): void => {
    pizzaObj.id = nextPizzaId++
    menu.push(pizzaObj)
}

// Using uitility type off Omit
// Which is remove unwanted field in the model
// In case of let's database insert id it automatically
const newAddNewPizza = (newPizza: Omit<Pizza, "id">): Pizza => {
    const pizza: Pizza = {
        id: nextPizzaId++,
        ...newPizza
    }

    menu.push(pizza)

    return pizza    
}

// Generic function
// This case is use for function that parameter of any array type
const addToArray = <Type>(array: Type[], item: Type) => {
    array.push(item)
    return array
}

addToArray(menu, {id: nextPizzaId++, name:"palm", price: 50})
// Generic type that use a union string should declare like this
addToArray<Order>(orderQueue, {id: nextOrderId++, pizza: menu[2], status: "completed"})

const placeOrder = (pizzaName: string): Order | undefined => {
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

const completeOrder = (orderId: number): Order | undefined => {
    const order = orderQueue.find((order) => order.id === orderId)

    // Always check if variable exits after using some method
    if (!order) {
        console.error(`${orderId} does not exist in the order queue`)
        return
    }

    order.status = 'completed'

    return order
}

// Using Partial uitility type to make type optional
const updatePizza = (id: number, updatePizza: PizzaUpdate): Pizza | undefined => {
    const pizza = menu.find((pizza) => pizza.id === id)

    // Always check if variable exits after using some method
    if (!pizza) {
        console.error(`${id} does not exist in the menu`)
        return
    }

    Object.assign(pizza, updatePizza)
}

// Without declare return type, typescript will automatically detect the return type
// In this case it will be Pizza | undefined
export const getPizzaDetail = (identifier: string | number): Pizza | undefined => {
    if (typeof identifier === 'number') {
        return menu.find((pizza) => pizza.id === identifier)
    } else if (typeof identifier === 'string') {
        return menu.find((pizza) => pizza.name.toLowerCase() === identifier.toLowerCase())
    } else {
        throw new TypeError('Invalid identifier')
    }
}

const getLastPizza = <Type>(array: Type[]) => {
    return array[array.length - 1]
}

newAddNewPizza({ name: 'Hawaiian', price: 20 })
newAddNewPizza({ name: 'Veggie', price: 18 })
newAddNewPizza({ name: 'Meat Feast', price: 22 })

placeOrder('Pepperoni')
completeOrder(1)

console.log('Order queue:', menu)
console.log('Cash in register:', cashInRegister)
console.log('Order queue:', orderQueue)
console.log('Last menu:', getLastPizza(menu))
