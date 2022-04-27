import { useEffect, useState } from 'react';
// import DataTable from './MaterialTable';
import { productAPI } from '../../api/productAPI';
import { CurrencyFormat } from '../../words/words';
import MaterialTable from './MaterialTable';
// import {getProducts} from 'server/productDB'
/*eslint-disable */
// @ts-ignore
function nonAccentVietnamese (str: any) {
  str = str.toLowerCase()
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
  str = str.replace(/đ/g, 'd')
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '') // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, '') // Â, Ê, Ă, Ơ, Ư
  return str
}

interface MaterialTableProductInterface {
  id: number
  name: string
  barrel_price: number
  whirlwind_price: number
  Single_price: number
  Gift: string
  Type: string
  category: string
  tableData: { id: number }
}
interface ProductInterface {
  id: number
  name: string
  barrel_price: number
  whirlwind_price: number
  Single_price: number
  Gift: string
  Type: string
  category: {
    id: number
    name: string
  }
}

export default function CustomizedTables () {
  const initialValues: MaterialTableProductInterface = {
    id: 0,
    name: '',
    barrel_price: 0,
    whirlwind_price: 0,
    Single_price: 0,
    Gift: '',
    Type: '',
    category: '',
    tableData: {
      id: 0
    }
  }

  // console.log(getProducts)
  const [products, setProducts] = useState([initialValues])
  async function fetchData () {
    await productAPI
      .fetchProduct()
      .then(data => {
        setProducts(
          data.map((value: any) => {
            value.category = value.category.name + '-' + value.category.id
            return value
          })
        )
      })
      .catch(e => window.electron.ipcRenderer.sendError(e))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: 'Tên các loại',
      field: 'name',
      grouping: false,
      customFilterAndSearch: (term: string, rowData: { name: string }) => {
        const datass = nonAccentVietnamese(rowData.name)
        const removeSpace = datass.trim()
        const search = removeSpace.indexOf(term.trim())
        return search !== -1
      }
    },
    {
      title: 'Giá thùng',
      field: 'barrel_price',
      render: (rowData: { barrel_price: any }) => (
        <CurrencyFormat
          value={rowData.barrel_price}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' VNĐ'}
        />
      )
    },
    {
      title: 'Giá lốc/hộp',
      field: 'whirlwind_price',
      render: (rowData: { whirlwind_price: any }) => (
        <CurrencyFormat
          value={rowData.whirlwind_price}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' VNĐ'}
        />
      )
    },
    {
      title: 'Giá lẻ',
      field: 'Single_price',
      render: (rowData: { Single_price: any }) => (
        <CurrencyFormat
          value={rowData.Single_price}
          displayType={'text'}
          thousandSeparator={true}
          suffix={' VNĐ'}
        />
      )
    },
    { title: 'Tặng kèm', field: 'Gift' },
    {
      title: 'Phân Loại',
      field: 'category',
      defaultGroupOrder: 0,
      defaultGroupSort: 'desc',
      customFilterAndSearch: (term: string, rowData: { category: string }) => {
        const datass = nonAccentVietnamese(rowData.category.split('-')[0])
        const removeSpace = datass.trim()
        const search = removeSpace.indexOf(term.trim())
        return search !== -1
      }
    }
  ]

  const payload = (values: MaterialTableProductInterface) => {
    const {
      id,
      name,
      barrel_price,
      whirlwind_price,
      Single_price,
      Gift,
      category
    } = values
    const catagoryId = category.split('-')
    return {
      id: id,
      name: name,
      barrel_price: barrel_price,
      whirlwind_price: whirlwind_price,
      Single_price: Single_price,
      Gift: Gift,
      Type: '',
      category: {
        id: parseInt(catagoryId[1]),
        name: catagoryId[0],
        parent: 0
      }
    }
  }

  const handleRowUpdate = async (
    newData: MaterialTableProductInterface,
    oldData: { category: any; tableData: { id: any } },
    resolve: any,
    reject: any
  ) => {
    console.log(newData)
    await productAPI
      .updateProduct(payload(newData))
      .then(function (respone: ProductInterface) {
        const updateProduct = { ...products }
        const index = oldData.tableData.id
        updateProduct[index].barrel_price = respone.barrel_price
        updateProduct[index].whirlwind_price = respone.whirlwind_price
        updateProduct[index].Single_price = respone.Single_price
        updateProduct[index].Gift = respone.Gift
        updateProduct[index].name = respone.name
        updateProduct[index].tableData.id = oldData.tableData.id
        resolve()
      })
      .catch(e => {
        window.electron.ipcRenderer.sendError(e)
        reject()
      })
  }
  //function for deleting a row
  const handleRowDelete = async (oldData: {
    id: any;
    tableData: { id: any }
  }) => {
    await productAPI
      .deleteProduct(oldData.id)
      .then(respone => {
        if (respone === 'OK') {
          const dataDelete = [...products]
          const index = oldData.tableData.id
          dataDelete.splice(index, 1)

          setProducts([...dataDelete])
        }
      })
      .catch(e => {
        window.electron.ipcRenderer.sendError(e)
      })
  }

  return (
    <>
      <MaterialTable
        handleRowUpdate={handleRowUpdate}
        handleRowDelete={handleRowDelete}
        title={'Danh sách sản phẩm'}
        columns={columns}
        dataValue={products}
      />
    </>
  )
}
