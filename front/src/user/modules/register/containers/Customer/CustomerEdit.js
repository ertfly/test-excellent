import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { bindActionCreators } from "redux"
import { callCustomerViewGet, callCustomerPost, callCustomerPut } from "../../actions/customers"

let CustomerEdit = ({ setPageAttr, methods: { callCustomerPost, callCustomerViewGet, callCustomerPut }, view }) => {
    const params = useParams()
    const [id] = useState(!params.id ? '' : params.id)
    const [name, setName] = useState('')

    useEffect(() => {
        let tabs
        if (!id) {
            tabs = [
                {
                    active: false,
                    to: '/customers',
                    label: 'Informações'
                },
                {
                    active: true,
                    to: '/customers/add',
                    label: 'Adicionar'
                }
            ]
        } else {
            callCustomerViewGet(id)
            tabs = [
                {
                    active: false,
                    to: '/customers',
                    label: 'Informações'
                },
                {
                    active: true,
                    to: '/customers/edit/' + id,
                    label: 'Editar'
                }
            ]
        }

        setPageAttr({
            title: 'Cliente - ' + (!id ? 'Novo' : 'Editar'),
            caption: 'Preencha os campos para inserir as informações',
            btns: [],
            tabs: tabs
        })
    }, [setPageAttr, id, callCustomerViewGet])

    useEffect(() => {
        setName(view.name)
    }, [view])

    const finishedSubmit = () => {
        setName('')
        window.navigate('/customers')
    }

    const submit = (e) => {
        e.preventDefault()

        let data = {
            name: encodeURI(name),
        }

        if (!id) {
            callCustomerPost(data, () => finishedSubmit())
        } else {
            callCustomerPut(id, data, () => finishedSubmit())
        }
    }

    return (
        <form onSubmit={submit}>
            <div className="form-row">
                <div className="col-md-12">
                    <div className="form-row">
                        <div className="col-md-6 form-group">
                            <label className="required">Nome Completo:</label>
                            <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="clearfix text-left mt-3">
                <button className="btn btn-primary" type="submit"><i className="mr-1 fas fa-save fa-white"></i>Salvar</button>
                <Link to={'/customers'} className="btn btn-secondary ml-3"><i className="fas fa-arrow-left mr-1"></i>Voltar</Link>
            </div>
        </form>
    )
}

const mapStateToProps = ({ register: { customers: { view } } }) => ({
    view: view,
});

const mapDispatchToProps = (dispatch) => ({
    methods: bindActionCreators(
        {
            callCustomerViewGet,
            callCustomerPost,
            callCustomerPut,
        },
        dispatch
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEdit)