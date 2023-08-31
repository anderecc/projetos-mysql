import { useSelector } from 'react-redux';
import RenderMenu from '../render/RenderMenu';

const Menus = () => {
    const app = useSelector((state) => state.app);
    return (
        <div className="gtco-section">
            <div className="gtco-container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 text-center gtco-heading">
                        <h2 className="cursive-font primary-color">
                            Pratos Populares
                        </h2>
                        <p>
                            Mussum Ipsum, cacilds vidis litro abertis. Diuretics
                            paradis num copo é motivis de denguis. Quem num
                            gosta di mé, boa gentis num é.
                        </p>
                    </div>
                </div>
                <RenderMenu menus={app.menus} />
            </div>
        </div>
    );
};

export default Menus;
