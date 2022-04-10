const USERS_PER_PAGE = 5
let currentPage = 1

function deleteUser(id){
    users = users.filter((user) => user.id !== id)
    render()
}

function getTotalPages() {
    return Math.ceil(users.length / USERS_PER_PAGE)

}

function getCurrentPageUsers(){
    const startIndex = (currentPage - 1)* USERS_PER_PAGE
    const endIndex = startIndex + USERS_PER_PAGE

    return users.slice(startIndex, endIndex)
}

function createCardName(user){
    const cardName = document.createElement('td')
    cardName.classList.add('card_name')
    cardName.textContent = user.first_name +'\n'+ user.last_name

    

    return cardName
}

function createCardEmail(user){
    const cardEmail = document.createElement('td')
    cardEmail.classList.add('card_email')
    cardEmail.textContent = user.email



    return cardEmail
}

function createCardDate(user){
    const cardDate = document.createElement('td')
    cardDate.classList.add('card_date')
    cardDate.textContent = user.created_at


    return cardDate
}

function createButtonElement(textContent){
    const buttonElement = document.createElement('button')
    buttonElement.textContent = textContent
    buttonElement.type = 'button'
    return buttonElement
}

function createCardActions(user) {
    const cardActions = document.createElement('td')
    cardActions.classList.add('action_buttons')

    const editButton = createButtonElement('editar')
    editButton.classList.add('text_button', 'edit_button')

    const deleteButton= createButtonElement('excluir')
    deleteButton.classList.add('text_button', 'delete_button')
    deleteButton.addEventListener('click', () => deleteUser(user.id))

    cardActions.appendChild(editButton)
    cardActions.appendChild(deleteButton)

    return cardActions
}

function createUserCard(user){
    const userCard = document.createElement('tr')
    userCard.id = user.id
    userCard.classList.add('user_card')

    const cardName = createCardName(user)
    const cardEmail = createCardEmail(user)
    const cardDate = createCardDate(user)
    const cardActions = createCardActions(user)

    userCard.appendChild(cardName)
    userCard.appendChild(cardEmail)
    userCard.appendChild(cardDate)
    userCard.appendChild(cardActions)


    return userCard
}

function createUsersCards(usersData){
    return usersData.map(createUserCard)
}

function renderUsers(){
    const usersData = getCurrentPageUsers()
    const usersCards = createUsersCards(usersData)

    const usersContainer = document.querySelector('.users')
    usersContainer.replaceChildren()
    usersCards.forEach((userCard) => usersContainer.appendChild(userCard))

}

function changePage(newPage) {
    const totalPages = getTotalPages()
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage
        render()
    }
}

function createPrevPageButton(){
    const prevPageButton = createButtonElement('<<')
    prevPageButton.addEventListener('click', () => {
        changePage(currentPage - 1)
    })

    return prevPageButton
}

function createNextPageButton() {
    const nextPageButton = createButtonElement('>>')
    nextPageButton.addEventListener('click', () => {
        changePage(currentPage + 1)
    })

    return nextPageButton
}

function createPaginationButton(page) {
    const paginationButton = createButtonElement(page)
    if (page == currentPage) paginationButton.classList.add('active')
    paginationButton.addEventListener('click', () => changePage(page))
    return paginationButton
}

function renderPagination(totalPages) {
    const pagination = document.querySelector('.pagination')
    pagination.replaceChildren()

    if(totalPages){
        const prevPageButton = createPrevPageButton()
        pagination.appendChild(prevPageButton)

        for (let page = 1; page <= totalPages; page++) {
            const paginationButton = createPaginationButton(page)
            pagination.appendChild(paginationButton)
        }

        const nextPageButton = createNextPageButton()
        pagination.appendChild(nextPageButton)
    }
}

function render() {
    const totalPages = getTotalPages()
    if (currentPage > totalPages) currentPage = totalPages

    renderPagination(totalPages)
    renderUsers()
}

render()