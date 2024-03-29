import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import { callProductStockListGet, callProductStockPost, callProductStockDelete } from "../../actions/productStocks"
import InputMask from "../../../../../common/containers/InputMask"
import Swal from "sweetalert2"
import TableView from "../../../../../common/containers/TableView"

let ProductStock = ({ setPageAttr, methods: { callProductStockListGet, callProductStockPost, callProductStockDelete }, list }) => {
    const params = useParams()
    let [searchParams] = useSearchParams();
    const [productId] = useState(!params.productId ? '' : params.productId)

    const [quantity, setQuantity] = useState('')
    const [positive, setPositive] = useState('1')

    const remove = (id) => {
        Swal.fire({
            title: 'Tem certeza que deseja deletar? Essa ação não poderá ser desfeita!',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sim',
            denyButtonText: `Não`,
        }).then((result) => {
            if (result.isConfirmed) {
                callProductStockDelete(id, () => {
                    let pg = searchParams.get('page')
                    pg = pg ? pg : 1
                    callProductStockListGet(productId, {}, pg)
                })
            }
        })
    }

    const headers = [
        {
            type: 'info',
            name: 'description',
            align: 'left',
            label: 'Descrição'
        },
        {
            type: 'custom',
            align: 'center',
            label: 'Quantidade',
            custom: (a) => {
                return <span className={a.quantity < 0 ? 'text-danger' : 'text-success'}>{a.quantity}</span>
            }
        },
        {
            type: 'custom',
            align: 'center',
            label: 'Saldo',
            custom: (a) => {
                return <span className="text-primary">{a.balance}</span>
            }
        },
        {
            type: 'info',
            name: 'user_name',
            align: 'left',
            label: 'Usuário'
        },
        {
            type: 'datetime',
            name: 'created_at',
            align: 'right',
            label: 'Cadastro'
        },
        {
            type: 'custom',
            align: 'right',
            label: 'Opções',
            custom: (a) => {
                if(!a.active){
                    return <></>
                }
                
                return (
                    <>
                        <span className='btn btn-sm btn-danger ml-2' onClick={() => remove(a.id)}><i className='fas fa-trash'></i></span>
                    </>
                )
            }
        }
    ]

    useEffect(() => {
        callProductStockListGet(productId)
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
                active: true,
                to: '/products/stock/' + productId,
                label: 'Estoque'
            },
            {
                active: false,
                to: '/products/images/' + productId,
                label: 'Imagens'
            }
        ]

        setPageAttr({
            title: 'Produto - Estoque',
            caption: 'Preencha os campos para inserir as informações',
            btns: [],
            tabs: tabs
        })
    }, [setPageAttr, productId, callProductStockListGet])

    const finishedSubmit = () => {
        callProductStockListGet(productId)
    }

    const submit = (e) => {
        e.preventDefault()
        let data = {
            productId: productId,
            quantity: quantity,
            positive: positive
        }

        callProductStockPost(data, () => finishedSubmit())
    }

    return (
        <>
            <form onSubmit={submit}>
                <div className="form-row">
                    <div className="col-md-12">
                        <div className="form-row">
                            <div className="col-md-6 form-group">
                                <label className="required">Quantidade:</label>
                                <InputMask mask="num" value={quantity} onChange={v => setQuantity(v)} />
                            </div>
                            <div className="col-md-6 form-group">
                                <label className="required">Ação:</label>
                                <select className="form-control" value={positive} onChange={e => setPositive(e.target.value)}>
                                    <option value="1">Adicionar</option>
                                    <option value="0">Remover</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="clearfix text-left mt-3">
                    <button className="btn btn-primary" type="submit"><i className="mr-1 fas fa-save fa-white"></i>Salvar</button>
                </div>
            </form>
            <div className="clearfix mt-3">
                <TableView headers={headers} rows={list.rows} total={list.total} pagination={list.pagination} paginationTo={'/product-stocks/' + productId} />
            </div>
        </>
    )
}

const mapStateToProps = ({ product: { productStocks: { list } } }) => ({
    list: list,
});

const mapDispatchToProps = (dispatch) => ({
    methods: bindActionCreators(
        {
            callProductStockListGet,
            callProductStockPost,
            callProductStockDelete
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductStock)