import { connect } from 'react-redux'
import { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { callProductListGet, callProductDelete, callProductClearView } from '../../actions/products'
import { Link, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import TableView from '../../../../../common/containers/TableView'

let ProductList = ({ setPageAttr, list, methods: { callProductListGet, callProductDelete, callProductClearView } }) => {
    let [searchParams] = useSearchParams();
    const remove = (id) => {
        Swal.fire({
            title: 'Tem certeza que deseja deletar? Essa ação não poderá ser desfeita!',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Sim',
            denyButtonText: `Não`,
        }).then((result) => {
            if (result.isConfirmed) {
                callProductDelete(id, () => {
                    let pg = searchParams.get('pg')
                    pg = pg ? pg : 1
                    callProductListGet({}, pg)
                })
            }
        })
    }
    const headers = [
        {
            type: 'custom',
            align: 'center',
            style: {
                width: '100px'
            },
            label: 'Foto',
            custom: (a) => {
                if(!a.file){
                    return <></>
                }
                return (
                    <>
                        <img src={`${process.env.REACT_APP_API_HOST}/storage/products/${a.file}`} className='img-thumb' alt='foto do produto' style={{width:'70px'}} />
                    </>
                )
            }
        },
        {
            type: 'info',
            name: 'name',
            align: 'left',
            label: 'Nome'
        },
        {
            type: 'money',
            name: 'price',
            align: 'right',
            label: 'Preço(R$)'
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
                return (
                    <>
                        <Link to={'/products/edit/' + a.id} className='btn btn-sm btn-primary'><i className='fas fa-edit'></i></Link>
                        <span className='btn btn-sm btn-danger ml-2' onClick={() => remove(a.id)}><i className='fas fa-trash'></i></span>
                    </>
                )
            }
        }
    ]

    useEffect(() => {
        callProductClearView()
        let pg = searchParams.get('pg')
        pg = pg ? pg : 1
        callProductListGet({}, pg)
    }, [callProductListGet, callProductClearView, searchParams])

    useEffect(() => {
        setPageAttr({
            title: 'Produtos',
            caption: 'Gestão dos produtos',
            btns: [
                {
                    type: 'link',
                    class: 'btn btn-primary',
                    icon: 'fas fa-plus',
                    label: 'Adicionar',
                    to: '/products/add'
                }
            ],
            tabs: [
                {
                    active: true,
                    to: '/products',
                    label: 'Informações'
                }
            ]
        })
    }, [setPageAttr])

    return (
        <TableView headers={headers} rows={list.rows} total={list.total} pagination={list.pagination} paginationTo={'/products'} />
    )
}

const mapStateToProps = ({ product: { products: { list } } }) => ({
    list: list,
});

const mapDispatchToProps = (dispatch) => ({
    methods: bindActionCreators(
        {
            callProductListGet,
            callProductDelete,
            callProductClearView
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)