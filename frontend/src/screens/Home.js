import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import burger from '../assets/burger.jpg'
import chowmein from '../assets/chowmein.jpg'
import pizza from '../assets/pizza.jpg'
import Carousel from '../components/Carousel'
import BASE_URL from '../config'

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search,setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch(`${BASE_URL}/api/foodData`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json();
    setFoodCat(response[1]);
    setFoodItem(response[0]);
  }

  useEffect(() => {
    loadData();
  }, [])
  return (
    <div>
      <Navbar />
      <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }} >
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value = {search} onChange={(e)=>{setSearch(e.target.value)}}/>
              
            </div>
          </div>
          <div className="carousel-item active ">
            <img src={burger} style={{ filter: "brightness(30%)", backgroundSize: '100% 100%' }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={chowmein} style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={pizza} style={{ filter: "brightness(30%)" }} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
      <div className='container'>
        {
          foodCat != []
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}  </div>
                  <hr />

                  {

                    foodItem !== [] ?
                      foodItem.filter((item) => (item.CategoryName === data.CategoryName ) && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map(
                        filterItems => {
                          return <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'> <Card
                            foodItems = {filterItems}
                            options={filterItems.options[0]}
                            
                          ></Card> </div>
                        }
                      ) : <div> No such Data found </div>
                  }
                </div>
              )
            })
            : <div></div>
        }
      </div>

      <Footer />
    </div>
  )
}
