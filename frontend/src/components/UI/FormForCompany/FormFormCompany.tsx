import React, { useEffect, useState } from 'react';
import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyApi } from '../../../../types';
import { selectAddCategoryLoading, selectCategories } from '../../../store/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FileInput from '../FileInput/FileInput';
import { addCompany, editCompany, fetchCompanies, fetchCompanyById } from '../../../store/companiesThunks';
import { clearAllCompanies, selectCompany } from '../../../store/companiesSlice';
import { addPromotion, editPromotion, fetchPromotionById } from '../../../store/promotionsThunks';
import dayjs from 'dayjs';
import { selectPromotion } from '../../../store/promotionsSlice';
import { apiUrl } from '../../../constants';

const FormForCompany = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const company = useAppSelector(selectCompany);
  const addCategoryLoading = useAppSelector(selectAddCategoryLoading);

  const [state, setState] = useState<CompanyApi>({
    title: '',
    description: '',
    categories: [],
    image: null,
    link: '',
  });

  useEffect(() => {
    if (params.id) {
      dispatch(fetchCompanyById(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    if (company && params.id) {
      console.log(company.categories);
      const categoryIds = company.categories.map((category) => category._id);
      setState({
        title: company.title,
        description: company.description,
        categories: categoryIds,
        image: company.image,
        link: company.link,
      });
    } else {
      setState({
        title: '',
        description: '',
        categories: [],
        image: null,
        link: '',
      });
    }
  }, [company, params.id]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id && company) {
      await dispatch(
        editCompany({
          id: params.id,
          company: {
            title: state.title,
            description: state.description,
            categories: state.categories,
            image: state.image,
            link: state.link,
          },
        }),
      );
    } else {
      await dispatch(
        addCompany({
          title: state.title,
          description: state.description,
          categories: state.categories,
          image: state.image,
          link: state.link,
        }),
      );
    }
    setState({ title: '', description: '', categories: [], image: null, link: '' });
    await dispatch(clearAllCompanies());
    await dispatch(fetchCompanies());
    navigate('/admin/admin-company');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const selectChangeHandler = (e: SelectChangeEvent<string[]>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  let disabled = false;

  if (addCategoryLoading) {
    disabled = true;
  }

  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
      style={{ marginTop: '120px', width: '500px', marginLeft: '50px' }}
    >
      <Grid item container justifyContent="space-between" alignItems="center" xs sx={{ mb: 1 }}>
        <InputLabel id="title">Название</InputLabel>
        <TextField
          sx={{ width: '100%' }}
          id="title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          required
        />

        <InputLabel id="parent">Описание</InputLabel>
        <TextField
          sx={{ width: '100%' }}
          id="description"
          value={state.description}
          onChange={inputChangeHandler}
          name="description"
        />

        <InputLabel id="parent">Ссылка на сайт</InputLabel>
        <TextField sx={{ width: '100%' }} id="link" value={state.link} onChange={inputChangeHandler} name="link" />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{ mb: 1 }}>
        <Grid item xs>
          <InputLabel id="parent">Категории</InputLabel>
          <Select
            labelId="categories"
            sx={{ width: '100%' }}
            id="categories"
            value={state.categories}
            onChange={selectChangeHandler}
            name="categories"
            multiple
            required
          >
            {categories &&
              categories.map((category) => (
                <MenuItem value={category._id} key={category._id}>
                  {category.title}
                </MenuItem>
              ))}
          </Select>
        </Grid>

        <Grid item xs>
          <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />
        </Grid>
        <Grid item xs>
          <img
            src={apiUrl + '/' + state.image}
            className="card-img-top"
            style={{
              height: '200px',
              objectFit: 'cover',
            }}
            alt="image"
          />
        </Grid>
      </Grid>

      {params.id ? (
        <Button disabled={disabled} style={{ marginBottom: '40px' }} type="submit" color="primary" variant="contained">
          Edit company
        </Button>
      ) : (
        <Button disabled={disabled} type="submit" color="primary" variant="contained">
          Add company
        </Button>
      )}
    </form>
  );
};

export default FormForCompany;
