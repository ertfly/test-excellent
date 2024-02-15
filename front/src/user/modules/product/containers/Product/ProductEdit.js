import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import { callProductViewGet, callProductPost, callProductPut } from "../../actions/products"
import InputMask from "../../../../../common/containers/InputMask"

let ProductEdit = ({ setPageAttr, methods: { callProductPost, callProductViewGet, callProductPut }, view }) => {
    const params = useParams()
    const [id, setId] = useState(!params.id ? '' : params.id)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        let tabs
        if (!id) {
            tabs = [
                {
                    active: false,
                    to: '/products',
                    label: 'Informações'
                },
                {
                    active: true,
                    to: '/products/add',
                    label: 'Adicionar'
                }
            ]
        } else {
            callProductViewGet(id)
            tabs = [
                {
                    active: false,
                    to: '/products',
                    label: 'Informações'
                },
                {
                    active: true,
                    to: '/products/edit/' + id,
                    label: 'Editar'
                },
                {
                    active: false,
                    to: '/products/stock/' + id,
                    label: 'Estoque'
                },
                {
                    active: false,
                    to: '/products/images/' + id,
                    label: 'Imagens'
                }
            ]
        }

        setPageAttr({
            title: 'Produto - ' + (!id ? 'Novo' : 'Editar'),
            caption: 'Preencha os campos para inserir as informações',
            btns: [],
            tabs: tabs
        })
    }, [setPageAttr, id, callProductViewGet])

    useEffect(() => {
        setName(view.name)
        setPrice(view.price)
    }, [view])

    const finishedSubmit = (id = null) => {
        if(id){
            setId(id)
            window.navigate('/products/edit/' + id)
            return;
        }
    }

    const submit = (e) => {
        e.preventDefault()
        let data = {
            name: encodeURI(name),
            price: encodeURI(price),
        }

        if (!id) {
            callProductPost(data, (id) => finishedSubmit(id))
        } else {
            callProductPut(id, data, () => finishedSubmit())
        }
    }

    return (
        <form onSubmit={submit}>
            <div className="form-row">
                <div className="col-md-12">
                    <div className="form-row">
                        <div className="col-md-6 form-group">
                            <label className="required">Nome:</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="col-md-6 form-group">
                            <label className="required">Preço(R$):</label>
                            <InputMask mask="dec_2" value={price} onChange={v => setPrice(v)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="clearfix text-left mt-3">
                <button className="btn btn-primary" type="submit"><i className="mr-1 fas fa-save fa-white"></i>Salvar</button>
                <Link to={'/products'} className="btn btn-secondary ml-3"><i className="fas fa-arrow-left mr-1"></i>Voltar</Link>
            </div>
        </form>
    )
}

const mapStateToProps = ({ product: { products: { view } } }) => ({
    view: view,
});

const mapDispatchToProps = (dispatch) => ({
    methods: bindActionCreators(
        {
            callProductViewGet,
            callProductPost,
            callProductPut
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)