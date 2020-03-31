import React, { Component } from 'react';
import { ProductGrid, Header } from '../component/ProductGrid';
import Loading from '../assets/images/Loading.gif';
import '../App.css';
export default class Products extends Component {

    constructor() {
        super();
        this.state = {
            isloading: true
        }
    }

    getProducts = async () => {
        console.log("hello")
        await fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then((response) => {
                this.setState({ Products: [...this.state.Products, ...response], isloading: false })
                document.removeEventListener('scroll', this.getProducts);
                // console.log(response)
            })

    }

    async componentDidMount() {
        await fetch("http://localhost:3000/products")
            .then(res => res.json())
            .then((response) => {
                this.setState({ Products: response, isloading: false })
            })
    }

    filter(e) {
        var index = e.nativeEvent.target.selectedIndex;
        var tryed = e.nativeEvent.target[index].text
        console.log("hello", tryed)

        if (tryed === "Select") {

        }
        else if (tryed === "Price") {
            this.setState({ isloading: true, Products: null })
            fetch("http://localhost:3000/products?_sort=price")
                .then(res => res.json())
                .then((response) => {
                    console.log(response)
                    this.setState({
                        Products: response,
                        isloading: false
                    })
                })
        }
        else if (tryed === "Size") {
            this.setState({ isloading: true, Products: null })
            fetch("http://localhost:3000/products?_sort=size")
                .then(res => res.json())
                .then((response) => {
                    console.log(response)
                    this.setState({
                        Products: response,
                        isloading: false
                    })
                })
        }
        else if (tryed === "id") {
            this.setState({ isloading: true, Products: null })
            fetch("http://localhost:3000/products?_sort=id")
                .then(res => res.json())
                .then((response) => {
                    console.log(response)
                    this.setState({
                        Products: response,
                        isloading: false
                    })
                })
        }
    }

    render() {
        return <div id='header'>
            <Header clicked={(e) => this.filter(e)} />
            <div style={{ padding: 20 }} onScroll={this.getProducts}>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    {!this.state.isloading && this.state.Products.map((items, index) => {
                        var num = items.price * 0.0060;
                        var price = num.toFixed(2);
                        if (index % 20 == 0) {
                            console.log(index)
                            return (
                                <div style={{ padding: 20, width: "90%" }} className="Product_div_style">
                                    <p >Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
                                    <p>But first, a word from our sponsors:</p>
                                    <br />
                                    <img className="ad" src={"https://picsum.photos/320/200?image=" + Math.floor(Math.random() * 1000)} />
                                </div>
                            )
                        }
                        return <ProductGrid face={items.face} size={items.size} price={price} FaceSize={items.size} PastDate={items.date} key={index} />
                    })}
                </div>
                <br />
                {!this.state.isloading ?
                    <h3 style={{ width: '100%' }}>
                        <b style={{ padding: '0% 40%' }}>~ end of catalogue ~</b>
                    </h3> : null}
                {this.state.isloading && <img src={Loading} className="loader" />}
            </div>
        </div>
    }
}