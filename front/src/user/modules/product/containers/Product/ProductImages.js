import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import { callProductImageListGet, callProductImagePost, callProductImageDelete } from "../../actions/productImages"
// import Swal from "sweetalert2"

let ProductImages = ({ setPageAttr, methods: { callProductImageListGet, callProductImagePost, callProductImageDelete }, list }) => {
    const params = useParams()
    const [productId] = useState(!params.productId ? '' : params.productId)

    /* const remove = (id) => {
        Swal.fire({
            title: 'Tem certeza que deseja deletar? Essa ação não poderá ser desfeita!',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sim',
            denyButtonText: `Não`,
        }).then((result) => {
            if (result.isConfirmed) {
                callProductImageDelete(id, () => {
                    let pg = searchParams.get('page')
                    pg = pg ? pg : 1
                    callProductImageListGet(productId, {}, pg)
                })
            }
        })
    } */

    useEffect(() => {
        callProductImageListGet(productId)
        let tabs = [
            {
                active: false,
                to: '/products',
                label: 'Informações'
            },
            {
                active: false,
                to: '/products/edit/' + productId,
                label: 'Editar'
            },
            {
                active: false,
                to: '/products/stock/' + productId,
                label: 'Estoque'
            },
            {
                active: true,
                to: '/products/images/' + productId,
                label: 'Imagens'
            }
        ]

        setPageAttr({
            title: 'Produto - Imagens',
            caption: 'Preencha os campos para inserir as informações',
            btns: [],
            tabs: tabs
        })
    }, [setPageAttr, productId, callProductImageListGet])

    /* const finishedSubmit = () => {
        callProductImageListGet(productId)
    }

    const submit = (e) => {
        e.preventDefault()
        let data = {
        }

        callProductImagePost(data, () => finishedSubmit())
    } */

    return (
        <>
            <div className="clearfix text-left">
                <button className="btn btn-primary" type="button"><i className="mr-1 fas fa-plus fa-white"></i>Adicionar Imagem</button>
            </div>
            <div className="row mt-3">
                {list.rows.map((a, ai) => {
                    return (
                        <div key={ai} className="col-md-3">
                            <div>
                                <div>
                                    <img className='img-thumbnail' src={`${process.env.REACT_APP_API_HOST}/storage/products/${a.file}`} alt='foto do produto' style={{ minHeight: '100%', width: '100%' }} />
                                </div>
                                <div className='d-flex mt-2'>
                                    <button className="btn btn-danger flex-fill" type="button"><i className="mr-1 fas fa-trash fa-white"></i>Deletar</button>
                                    <div style={{width:'20px'}}></div>
                                    <button className="btn btn-success flex-fill" type="button"><i className="mr-1 fas fa-check text-white"></i>Principal</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

const mapStateToProps = ({ product: { productImages: { list } } }) => ({
    list: list,
});

const mapDispatchToProps = (dispatch) => ({
    methods: bindActionCreators(
        {
            callProductImageListGet,
            callProductImagePost,
            callProductImageDelete
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductImages)