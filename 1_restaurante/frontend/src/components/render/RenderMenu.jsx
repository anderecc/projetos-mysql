const RenderMenu = ({ menus }) => {
    const renderMenus = () => {
        const data = menus ?? [];
        return data.map((menu, index) => (
            <div className="col-lg-4 col-md-4 col-sm-6" key={index}>
                <a href={menu.photo} className="fh5co-card-item image-popup">
                    <figure>
                        <div className="overlay">
                            <i className="ti-plus"></i>
                        </div>
                        <img
                            src={menu.photo}
                            alt="Image"
                            className="img-responsive"
                        />
                    </figure>
                    <div className="fh5co-text">
                        <h2>{menu.title}</h2>
                        <p>{menu.description}</p>
                        <p>
                            <span className="price cursive-font">
                                R$ {menu.price}
                            </span>
                        </p>
                    </div>
                </a>
            </div>
        ));
    };
    return <div className="row">{renderMenus()}</div>;
};

export default RenderMenu;
