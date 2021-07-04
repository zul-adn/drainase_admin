import React, { useEffect, useState } from 'react';
import { Layout, Select, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Form, Radio } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import { createupdate, getall, remove, getbyid, getbykategori } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge'
import styled from 'styled-components';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
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


export default function Polyline() {

    const [modal, setModal] = useState(false)
    const [listPolyline, setListPolyline] = useState([])
    const [name, setName] = useState('')
    const [panjang, setPanjang] = useState('')
    const [tipe_saluran, setTipeSaluran] = useState('')
    const [konstruksi, setKonstruksi] = useState('')
    const [kondisi, setKondisi] = useState('')
    const [kondisi_saluran, setKondisiSaluran] = useState('')
    const [file_geojson, setFileGeoJson] = useState('')
    const [lebar_atas, setLebarAtas] = useState('')
    const [lebar_bawah, setLebarBawah] = useState('')
    const [kedalaman, setKedalaman] = useState('')
    const [ext, setExt] = useState('')
    const [catatan, setCatatan] = useState('')
    const [isUpdate, setIsUpdate] = useState('')

    const [listTipeSaluran, setListTipeSaluran] = useState([])
    const [listKontruksi, setListKonstruksi] = useState([])
    const [listKondisi, setListKondisi] = useState([])
    const [listKondisiSaluran, setListKondisiSaluran] = useState([])
    const [listKecamatan, setListKecamatan] = useState([])

    useEffect(() => {
        getPolyline()
        attrTipeSaluran()
        attrKondisiKonstruksi()
        attrKondisiSaluran()
        attrKonstruksi()
        attrKecamatan()
    }, [])

    const attrTipeSaluran = async () => {
        const url = 'getbykategori'
        const kategoris = 'Tipe Saluran'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrtipesaluran = await getbykategori(datas, url)
        setListTipeSaluran(attrtipesaluran)
    }

    const attrKondisiKonstruksi = async () => {
        const url = 'getbykategori'
        const kategoris = 'Kondisi'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrkondisi = await getbykategori(datas, url)
       
        setListKondisi(attrkondisi)
    }

    const attrKondisiSaluran= async () => {
        const url = 'getbykategori'
        const kategoris = 'Kondisi Saluran'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrkondisisaluran = await getbykategori(datas, url)
      
        setListKondisiSaluran(attrkondisisaluran)
    }

    const attrKonstruksi= async () => {
        const url = 'getbykategori'
        const kategoris = 'Konstruksi'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrkonstruksi = await getbykategori(datas, url)
        
        setListKonstruksi(attrkonstruksi)
    }

    const attrKecamatan= async () => {
        const url = 'getbykategori'
        const kategoris = 'Kecamatan'
        let datas = {
            kategori : kategoris
        }
        const data = []
        let attrkecamatan = await getbykategori(datas, url)
       
        setListKecamatan(attrkecamatan)
    }


    const modelTrigger = () => {
        setModal(!modal)
    }

    const createorupdate = () => {
        // isUpdate ? update() : create()
        create()
    }

    const createnew = async () => {
        modelTrigger()
        setIsUpdate(false)
        // resetForm()
    }

    const create = async () => {
        if (name === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                name,
                panjang,
                tipe_saluran,
                konstruksi,
                kondisi,
                kondisi_saluran,
                file_geojson,
                lebar_atas,
                lebar_bawah,
                kedalaman,
                ext,
                catatan,
            }
            console.log(isUpdate)
            const apiurl = 'createpolyline';
            console.log(apiurl)
            let createpegawai = await createupdate(datas, apiurl)
            if (createpegawai === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getPolyline()
                modelTrigger()
                resetForm()
            } else {
                notification.open({
                    message: 'Gagal Menyimpan Data',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
        }
    }

    const resetForm = () => {
       setName('')
       setPanjang('')
       setTipeSaluran('')
       setKonstruksi('')
       setKondisi('')
       setKondisiSaluran('')
       setLebarAtas('')
       setLebarBawah('')
       setKedalaman('')
       setExt('')
       setCatatan('')
    }

    const getPolyline = async () => {
        const data = []
        const url = 'getpolyline'
        let polyline = await getall(url)

        let data_length = polyline.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: polyline[i].id,
                name: polyline[i].name,
                panjang: polyline[i].panjang,
                tipe_saluran: polyline[i].tipe_saluran,
            })
        }
        setListPolyline(data)
    }

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
          console.log("e.target.result", e.target.result);
          setFileGeoJson(e.target.result);
        };
      };

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: 'Panjang',
            key: 'panjang',
            dataIndex: 'panjang'
        },
        {
            title: 'Tipe Saluran',
            key: 'tipe_saluran',
            dataIndex: 'tipe_saluran'
        },
        {
            title: 'Action',
            key: 'action',
            // render: (text, record) => (
            //     <span>
            //         <Button key="edit" onClick={() => getPegawaiById(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<InfoCircleOutlined />} >Edit</Button>
            //         <Popconfirm
            //             title="Anda yakin menghapus Data ini?"
            //             onConfirm={() => removepagawai(record.id)}
            //             // onCancel={cancel}
            //             okText="Yes"
            //             cancelText="No"
            //         >
            //             <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} >Hapus</Button>
            //         </Popconfirm>
            //     </span>
            // ),
        },
    ];

    const onChangeKonstruksi = value => {
        setKonstruksi(value)
    }

    const onChangeKondisi = value => {
        setKondisi(value)
    }

    const onChangeTipeSaluran = value => {
        setTipeSaluran(value)
    }

    const onChangeKondisiSaluran = value => {
        setKondisiSaluran(value)
    }

    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
            }}
        >

            <Card
                title="Polyline"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={createnew}>Tambah Data Polyline </Button>}
                style={{ width: '100%', borderWidth: 0, marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20, }}
            />

            <Table columns={columns} dataSource={listPolyline} />

            <Modal
                title="Tambah Polyline"
                centered
                visible={modal}
                onOk={createorupdate}
                onCancel={modelTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#0984e3', color:'white' }}>
                    <Label>Data Primer</Label>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Nama Jaringan</Label>
                    <Inputx placeholder="Nama Jaringan" value={name} onChange={e => setName(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Panjang</Label>
                    <Inputx placeholder="Panjang" value={panjang} onChange={e => setPanjang(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Tipe Saluran</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Tipe Saluran"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeTipeSaluran}
                        value={tipe_saluran}
                    >
                        {listTipeSaluran.map((data, index) =>
                            <Option value={data.nama_attr}>{data.nama_attr}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Konstruksi</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Konstruksi"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeKonstruksi}
                        value={konstruksi}
                    >
                        {listKontruksi.map((data, index) =>
                            <Option value={data.nama_attr}>{data.nama_attr}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Kondisi Konstruksi</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Kondisi Konstruksi"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeKondisi}
                        value={kondisi}
                    >
                        {listKondisi.map((data, index) =>
                            <Option value={data.nama_attr}>{data.nama_attr}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Kondisi Saluran</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Pilih Kondisi Saluran"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeKondisiSaluran}
                        value={kondisi_saluran}
                    >
                        {listKondisiSaluran.map((data, index) =>
                            <Option value={data.nama_attr}>{data.nama_attr}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>File GeoJson</Label>
                    <input type="file" onChange={handleChange} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Lebar Atas</Label>
                    <Inputx placeholder="Lebar Atas" value={lebar_atas} onChange={e => setLebarAtas(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Lebar Bawah</Label>
                    <Inputx placeholder="Lebar Bawah" value={lebar_bawah} onChange={e => setLebarBawah(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Kedalaman</Label>
                    <Inputx placeholder="Kedalaman" value={kedalaman} onChange={e => setKedalaman(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Kecamatan</Label>
                    <Inputx placeholder="Kecamatan" value={ext} onChange={e => setExt(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Catatan</Label>
                    <Inputx placeholder="Catatan" value={catatan} onChange={e => setCatatan(e.target.value)} />
                </InputBoxCenter>
            </Modal>

        </Content>
    )
}
