interface Props {
    itemList: Array<String>
}

const Navbar = ({itemList}: Props) => { 

    return (
            <nav className="container">
                <div className="row w-100 d-flex jsutify-content-between">
                    <div className="col">
                        <div className="d-flex justify-content-between">
                            <ul className='d-flex list-unstyled row-column justify-content-around align-items-center gap-3 col' style= {{height:'100px' }}>
                                {
                                    itemList.map((value, index) => (
                                        <li className="text-white fs-5">{value}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex col align-items-center justify-content-center col">
                        <input type="text" name="search" id="search" className="form-control h-auto border-0 border-bottom rounded-0 p-1 bg-primary" placeholder="Search here!!"/>
                    </div>
                    <div className="d-flex justify-content-end align-items-center col">
                        <img src="https:github.com/alexisNahu.png" alt="logo" className="img-resized" style={{ width: '50px', height: '50px' }}/>
                    </div>
                </div>

            </nav>
    )
}

export default Navbar