import { Link } from 'react-router-dom';


function MainPage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>
            <Link
                style={{
                    position: 'relative'
                }}
                to="/maptypes"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Map Types
            </Link>
            <Link
                style={{
                    position: 'relative'
                }}
                to="/streetview"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Street View
            </Link>
            <Link
                style={{
                    position: 'relative'
                }}
                to="/countries"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Countries
            </Link>
            <Link
                style={{
                    position: 'relative'
                }}
                to="/drawpolygon"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Draw Polygon
            </Link>
            <Link
                style={{
                    position: 'relative'
                }}
                to="/resizablerectangle"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Resizable Rectangle
            </Link>
            <Link
                style={{
                    position: 'relative'
                }}
                to="/namemap"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Name Map
            </Link>
        </div>
    )
}

export default MainPage;