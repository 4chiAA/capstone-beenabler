import BeehiveDetail from "../components/BeehiveDetail.tsx";

export default function BeehiveDetailPage() {

    return (
        <div className="page-container">
            <div className="wrapper">
                <div className="title-container">
                    <div className="divider"></div>
                    <h2>Dein Bienenvolk</h2>
                    <div className="divider"></div>
                </div>
                <BeehiveDetail/>
            </div>
        </div>
    )
}
