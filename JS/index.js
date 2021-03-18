const baseUrl = "https://anbo-bookstorerest.azurewebsites.net/api/books"

Vue.createApp({
    data() {
        return {
            books: [],
            singleBook: null,
            id: null,
            publisher: "",
            error: null,
            deleteMessage: "",
            bookid: 0,
            deleteId: 0,
            addData: {title: "", author: "", publisher: "", price: 0},
            addMessage: "",
            updateData: {id: 0, title: "", author: "", publisher: "", price: 0},
            updateMessage: ""

        }

    },
    methods: {
        getAllBooks(){
            this.helperGetAndShow(baseUrl)
        },
        
        async helperGetAndShow(url){
            try {
                const response = await axios.get(url)
                this.books = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        cleanlist(){
            this.books = []
        },
        async getBookid(id) {
            const url =  baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleBook = await response.data

            } catch (ex) {
                alert(ex.message)
            }
        },

        async deleteBook(deleteId) {
            const url = baseUrl + "/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllBooks()
            } catch (ex) {
                alert(ex.message)
            }
        },

        async addBook() {
            try {
            response = await axios.post(baseUrl, this.addData)
            this.addMessage = "response " + response.status +  " " + response.statusText
            this.getAllBooks()
            } catch (ex) {
                alert(ex.message)
            }
        },

        async updateBook() {
            const url = baseUrl + "/" + this.updateData.id
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "response " + response.status + " " + response.statusText
                this.getAllBooks()
            } catch (ex) {
                alert(ex.message)
            }
        }
           
    }

}).mount("#app")
