// // import RandomPhoto from './RandomTest';
// import React, { useEffect, useState } from 'react'
// import { TabContext, TabList, TabPanel } from '@mui/lab';
// import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Slide, Tab, TextField, Typography } from '@mui/material';
// import { TransitionProps } from '@mui/material/transitions';
// import PropTypes, { any } from 'prop-types';
// import { useDropzone } from 'react-dropzone'
// import { imageAPI } from '../../../../api/imageAPI'
// import { Button, FormGroup, Modal } from 'reactstrap';
// import { urlToObject } from '../File_convert'
// // import Dropzone from 'react-dropzone';

// RandomPhotoField.propTypes = {
//     field: PropTypes.object.isRequired,
//     form: PropTypes.object.isRequired,

//     label: PropTypes.string,
// };

// RandomPhotoField.defaultProps = {
//     label: '',
// }

// const Transition = React.forwardRef(function Transition(
//     props: TransitionProps & {
//         children: React.ReactElement<any, any>;
//     },
//     ref: React.Ref<unknown>,
// ) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });


// interface PhotoProps {
//     field: any,
//     form: any,
//     label: string,
// }



// function RandomPhotoField(props: PhotoProps) {
//     const { field, form, label } = props;
//     const { name, value, onBlur, onChange } = field;
//     const [page, setPage] = useState('1');
//     const [image_files, setImageFile] = useState();
//     const [images, setImages] = useState([
//         {
//             name: "",
//             size: 0,
//             type: "image/png",
//             url: "https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png"
//         }
//     ]);
//     const [open, setOpen] = useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//         setPage(newValue);
//     };

//     useEffect(() => {
//         async function loadImage() {
//             const data = await imageAPI.fecthImage();

//             console.log(data)

//             setImages(data);
//         }

//         loadImage();
//     }, [])

//     const chooseImage = async (url: string) => {
//         // const dataImage: any = await urlToObject(url);
//         const changeEvent = {
//             target: {
//                 name: name,
//                 value: url
//             }
//         };
//         onChange(changeEvent)
//         setOpen(false);
//     }
//     // console.clear();
//     return (
//         <FormGroup>
//             <div className="container">
//                 <Button variant="outlined" onClick={handleClickOpen}>
//                     Chọn ảnh
//                 </Button>
//                 <br />
//                 <img src={value} alt="Không tìm thấy ảnh" width={200} height={200} />
//                 <Dialog
//                     open={open}
//                     maxWidth={"md"}
//                     TransitionComponent={Transition}
//                     keepMounted
//                     onClose={handleClose}
//                     aria-describedby="alert-dialog-slide-description"
//                 >
//                     <DialogTitle>{"Thư viện ảnh"}</DialogTitle>
//                     <DialogContent>
//                         <DialogContentText id="alert-dialog-slide-description">
//                             <TabContext value={page}>
//                                 <TabList onChange={handleChange} aria-label="lab API tabs example">
//                                     <Tab label="Trang 1" value="1" />
//                                     <Tab label="Trang 2" value="2" />
//                                     <Tab label="Trang 3" value="3" />
//                                 </TabList>
//                                 <TabPanel value="1" >
//                                     <ImageList sx={{ width: 500, height: 450 }}>
//                                         <ImageListItem key="Subheader" cols={2}>
//                                             <ListSubheader component="div">
//                                                 <Box
//                                                     component="form"
//                                                     sx={{
//                                                         '& > :not(style)': { m: 1, width: '55ch' },
//                                                     }}
//                                                     noValidate
//                                                     autoComplete="off"
//                                                 >
//                                                     <TextField id="filled-basic" label="Tìm kiếm" variant="filled" />
//                                                 </Box>
//                                             </ListSubheader>
//                                         </ImageListItem>
//                                         {itemData.map((item) => (
//                                             <ImageListItem key={item.img}>
//                                                 <img
//                                                     src={`${item.img}?w=248&fit=crop&auto=format`}
//                                                     srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
//                                                     alt={item.title}
//                                                     onClick={() => chooseImage(item.img)}
//                                                     style={{ cursor: "pointer" }}
//                                                     loading="lazy"
//                                                 />
//                                                 <ImageListItemBar
//                                                     title={item.title}
//                                                 />
//                                             </ImageListItem>
//                                         ))}
//                                     </ImageList>
//                                 </TabPanel>
//                                 <TabPanel value="2">
//                                     Page 2
//                                     {/* {images.map((item) => {

//                                             console.log(item)
//                                             return (
//                                                 <ImageListItem key={item.name}>
//                                                     <img
//                                                         src={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
//                                                         srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
//                                                         alt={item.name}
//                                                         loading="lazy"
//                                                     />
//                                                     <ImageListItemBar
//                                                         title={item.name}
//                                                         subtitle={item.name}
//                                                         actionIcon={
//                                                             <IconButton
//                                                                 sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
//                                                                 aria-label={`info about ${item.name}`}
//                                                             >
                                                      
//                                                             </IconButton>
//                                                         }
//                                                     />
//                                                 </ImageListItem>
//                                             )
//                                         })} */}
//                                 </TabPanel>
//                                 <TabPanel value="3">Item Three</TabPanel>
//                             </TabContext>
//                         </DialogContentText>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleClose}>Disagree</Button>
//                         <Button onClick={handleClose}>Agree</Button>
//                     </DialogActions>
//                 </Dialog>
//             </div>
//         </FormGroup>

//     );
// }
// const itemData = [
//     {
//         img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//         title: 'Breakfast',
//         author: '@bkristastucchio',
//         rows: 2,
//         cols: 2,
//         featured: true,
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//         title: 'Burger',
//         author: '@rollelflex_graphy726',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//         title: 'Camera',
//         author: '@helloimnik',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//         title: 'Coffee',
//         author: '@nolanissac',
//         cols: 2,
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//         title: 'Hats',
//         author: '@hjrc33',
//         cols: 2,
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//         title: 'Honey',
//         author: '@arwinneil',
//         rows: 2,
//         cols: 2,
//         featured: true,
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//         title: 'Basketball',
//         author: '@tjdragotta',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//         title: 'Fern',
//         author: '@katie_wasserman',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//         title: 'Mushrooms',
//         author: '@silverdalex',
//         rows: 2,
//         cols: 2,
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//         title: 'Tomato basil',
//         author: '@shelleypauls',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//         title: 'Sea star',
//         author: '@peterlaster',
//     },
//     {
//         img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//         title: 'Bike',
//         author: '@southside_customs',
//         cols: 2,
//     },
// ];
// export default RandomPhotoField;

