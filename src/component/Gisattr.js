import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Row, Col, Card, Modal, Button, Select, notification, Table, Popconfirm } from 'antd';
import {
   CheckCircleOutlined,
   CloseCircleOutlined,
   DeleteOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid, getbykategori, deletepost } from '../api/api';
import styled from 'styled-components';


const { Header, Sider, Content } = Layout;
const { Option } = Select;

const InputBoxAbove = styled.div`
    border: 1px solid #a5b1c2;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px 5px 0px 0px ;
`;
const InputBoxCenter = styled.div`
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    border-bottom: 1px solid #a5b1c2;
    padding: 10px;
`;

const InputBoxBottom = styled.div`
    border-bottom: 1px solid #a5b1c2;
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    padding: 10px;
    border-radius: 0px 0px 5px 5px;
`;

const Judul = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    margin-top: 20px;
    &:focus{
        outline: none;
    }
`;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;

const Buttonx = styled.button`
    margin-top: 20px;
    background-color:#4b7bec;
    border: 1px solid #4b7bec;
    border-radius: 5px;
    color: white;
    padding: 7px;
    float: right;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    &:hover{
        color: #3498db;
        border: 1px solid #3498db;
        font-weight: bold;
    }
`;

const Inputx = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    &:focus{
        outline: none;
    }
`;

function Attr() {

    const [modal, setModal] = useState(false)
    const [nama_attr, setNamaAttr] = useState('')
    const [kategori, setKategori] = useState('')
    const [listTipeSaluran, setListTipeSaluran] = useState([])
    const [listKontruksi, setListKonstruksi] = useState([])
    const [listKondisi, setListKondisi] = useState([])
    const [listKondisiSaluran, setListKondisiSaluran] = useState([])
    const [listKecamatan, setListKecamatan] = useState([])
   

    useEffect(() => {
        attrTipeSaluran()
        attrKondisiKonstruksi()
        attrKondisiSaluran()
        attrKonstruksi()
        attrKecamatan()
    }, [])

    const modelTrigger = () => {
        setModal(!modal)
    }

    const attrTipeSaluran = async () => {
        const url = 'getbykategori'
        const kategoris = 'Tipe Saluran'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrtipesaluran = await getbykategori(datas, url)
        let data_length = attrtipesaluran.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrtipesaluran[i].id,
                nama: attrtipesaluran[i].nama_attr,
            })
        }
        setListTipeSaluran(data)
    }

    const attrKondisiKonstruksi = async () => {
        const url = 'getbykategori'
        const kategoris = 'Kondisi'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrkondisi = await getbykategori(datas, url)
        let data_length = attrkondisi.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrkondisi[i].id,
                nama: attrkondisi[i].nama_attr,
            })
        }
        setListKondisi(data)
    }

    const attrKondisiSaluran= async () => {
        const url = 'getbykategori'
        const kategoris = 'Kondisi Saluran'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrkondisisaluran = await getbykategori(datas, url)
        let data_length = attrkondisisaluran.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrkondisisaluran[i].id,
                nama: attrkondisisaluran[i].nama_attr,
            })
        }
        setListKondisiSaluran(data)
    }

    const attrKonstruksi= async () => {
        const url = 'getbykategori'
        const kategoris = 'Konstruksi'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrkonstruksi = await getbykategori(datas, url)
        let data_length = attrkonstruksi.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrkonstruksi[i].id,
                nama: attrkonstruksi[i].nama_attr,
            })
        }
        setListKonstruksi(data)
    }

    const attrKecamatan= async () => {
        const url = 'getbykategori'
        const kategoris = 'Kecamatan'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrkecamatan = await getbykategori(datas, url)
        let data_length = attrkecamatan.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: attrkecamatan[i].id,
                nama: attrkecamatan[i].nama_attr,
            })
        }
        setListKecamatan(data)
    }

    const onChangeKategori = value => {
        setKategori(value)
        console.log(value)
    }

    const createAttr = async() => {
        let datas = {
           nama_attr,
           kategori
        }
        let apiUrl = 'createattr'
        const createattr = await createupdate(datas, apiUrl)
        if (createattr === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            attrTipeSaluran()
            attrKondisiKonstruksi()
            attrKondisiSaluran()
            attrKonstruksi()
            attrKecamatan()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const removeattr = async(id) => {
        console.log(id)
        const datas = {
            id
        }
        const apiurl = 'deleteattr';
        let deletee = await deletepost(datas, apiurl) 
        if(deletee === 1){
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            attrTipeSaluran()
            attrKondisiKonstruksi()
            attrKondisiSaluran()
            attrKonstruksi()
            attrKecamatan()
        }else{
            notification.open({
                message: 'Gagal Menghapus Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }

    }


    const columns = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama Atribut',
            key: 'nama',
            dataIndex: 'nama'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removeattr(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} >Hapus</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];


    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 'auto',
               // height:'auto'
            }}
        >
            <Card
                title="Atribut"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={modelTrigger}>Tambah Atribut </Button>}
                style={{ width: '100%', borderWidth: 0 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />
            <Row style={{ width: '100%' }}>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Tipe Saluran"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                     <Table columns={columns} dataSource={listTipeSaluran} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Konstruksi"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                     <Table columns={columns} dataSource={listKontruksi} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Kondisi Konstruksi"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                     <Table columns={columns} dataSource={listKondisi} />
                </Col>
            </Row>
            <Row style={{ width: '100%' }}>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Konsisi Saluran"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                    <Table columns={columns} dataSource={listKondisiSaluran} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={8} style={{ padding: 10 }}>
                    <Card
                        title="Kecamatan"
                        //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                        style={{ width: '100%', borderWidth: 0 }}
                        headStyle={{ color: 'black', backgroundColor: '#dfe4ea', fontWeight: 'bold', fontSize: 14 }}
                    />
                     <Table columns={columns} dataSource={listKecamatan} />
                </Col>
            </Row>


            <Modal
                title="Tambah Atribut"
                centered
                visible={modal}
                onOk={createAttr}
                onCancel={modelTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Pegawai</Label>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Tingkat menurut peraturan perjalanan</Label>
                    <Select
                        showSearch
                        placeholder="Tingkat menurut peraturan perjalanan"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeKategori}
                        value={kategori}
                    >
                        <Option value="Tipe Saluran">Tipe Saluran</Option>
                        <Option value="Konstruksi">Konstruksi</Option>
                        <Option value="Kondisi">Kondisi Konstruksi</Option>
                        <Option value="Kondisi Saluran">Kondisi Saluran</Option>
                        <Option value="Kecamatan">Kecamatan</Option>
                    </Select>
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>Nama Atribut</Label>
                    <Inputx placeholder="Nama Atribut" value={nama_attr} onChange={e => setNamaAttr(e.target.value)} />
                </InputBoxBottom>
            </Modal>

        </Content >
    )
}

export default Attr;