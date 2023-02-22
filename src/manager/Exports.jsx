import React from 'react'
import { withRouter } from '../withrouter'
import Header from '../Header'
import Typography from '@mui/material/Typography';
import { Box, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import IconButton from '@mui/material/IconButton';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Card from '@mui/material/Card';
import CopyRight from './components/footer';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function createData(name, ImportedDate, Process, Project) {
    return { name, ImportedDate, Process, Project };
  }
  
  const rows = [
    createData('sample import.Xlsx', '12th October, 2022', 'Sourcing', 'MSC'),
    createData('exported project images.Csv', '10th February, 2022', 'Keying', 'Grainger'),
    createData('sample import.Xlsx', '09th August, 2021', 'Sourcing', 'MSC'),
    createData('exported project images.Csv', '18th March, 2022', 'Keying', 'MSC'),
    createData('sample import.Xlsx', '20th November, 2022', 'Sourcing', 'MSC'),
    createData('exported project images.Csv', '12th December, 2022', 'Keying', 'MSC'),
  ];

    

const Exports = () => {

    const [project, setProject] = React.useState('');

    const handleChange = (event) => {
      setProject(event.target.value);
    };
  

  
    return (
        <div>
        <Header />
        <Box className="inner-header">
        <Box className='left'>
          <Typography variant="h5" gutterBottom>
            Exports
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
  
        </Box>
        <Box className="right">
                    
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Project</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              value={project}
              size='small'


            >
              <MenuItem >Project 1 </MenuItem>
              <MenuItem> Project 2 </MenuItem>
              <MenuItem> Project 3 </MenuItem>
            </Select>
          </FormControl>
        </Box>
                    <Button variant="contained" color='primary' sx={{ms:2}}>Export</Button>
                   
                </Box>
  
      </Box>
      <div className='content-wrapper inner'>
        
  
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box className="page-header">
              <Box className="left">
                <Typography variant='h5' gutterBottom>
                  Recent Uploads
                </Typography>
              </Box>
  
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Search...</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  label="Search..."
                  type='text'
                  size='small'
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
  
                        size='small'
                        edge="end"
                      >
                        {<SearchOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
  
                />
              </FormControl>
  
            </Box>
  
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell >File Name</StyledTableCell>
                    <StyledTableCell align="right">Imported Date</StyledTableCell>
                    <StyledTableCell align="right">Process&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Project&nbsp;(g)</StyledTableCell>
  
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.ImportedDate}</StyledTableCell>
                      <StyledTableCell align="right">{row.Process}</StyledTableCell>
                      <StyledTableCell align="right">{row.Project}</StyledTableCell>
  
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
  
      </div>
      < CopyRight />
      </div>
    )
}

export default withRouter(Exports)