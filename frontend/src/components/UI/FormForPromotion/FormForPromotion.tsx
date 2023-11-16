import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { CompanyApi, PromotionApi } from '../../../../types';
import { selectAddCategoryLoading, selectCategories } from '../../../store/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import FileInput from '../FileInput/FileInput';
import { addCompany, fetchCompanies } from '../../../store/companiesThunks';
import { clearAllCompanies, selectCompanies } from '../../../store/companiesSlice';
import {
  addPromotion,
  editPromotion,
  fetchPromotionById,
  fetchPromotions,
  fetchPromotionsByAdmin,
} from '../../../store/promotionsThunks';
import { clearAllPromotions, selectPromotion } from '../../../store/promotionsSlice';
import dayjs from 'dayjs';
import { setCategory } from '../../../store/filterSlice';
import { apiUrl } from '../../../constants';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

const FormForPromotion = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const promotion = useAppSelector(selectPromotion);
  const companies = useAppSelector(selectCompanies);
  const addCategoryLoading = useAppSelector(selectAddCategoryLoading);

  const [state, setState] = useState<PromotionApi>({
    title: '',
    description: '',
    company: '',
    image: null,
    isAlways: '',
    isBirthday: false,
    startDate: undefined,
    endDate: undefined,
  });

  console.log(state.image);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchPromotionById(params.id));
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (promotion && params.id) {
      const formattedStartDate = promotion.startDate
        ? dayjs(promotion.startDate).format('YYYY-MM-DDTHH:mm')
        : undefined;
      const formattedEndDate = promotion.endDate ? dayjs(promotion.endDate).format('YYYY-MM-DDTHH:mm') : undefined;
      setState({
        title: promotion.title,
        description: promotion.description,
        company: promotion.company._id.toString(),
        image: promotion.image,
        isAlways: promotion.isAlways.toString(),
        isBirthday: promotion.isBirthday,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
    } else {
      setState({
        title: '',
        description: '',
        company: '',
        image: null,
        isAlways: '',
        isBirthday: false,
        startDate: undefined,
        endDate: undefined,
      });
    }
  }, [promotion, params.id]);

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id && promotion) {
      await dispatch(
        editPromotion({
          id: params.id,
          promotion: {
            title: state.title,
            description: state.description,
            company: state.company,
            image: state.image,
            isAlways: state.isAlways,
            isBirthday: state.isBirthday,
            startDate: state.startDate,
            endDate: state.endDate,
          },
        }),
      );
    } else {
      await dispatch(
        addPromotion({
          title: state.title,
          description: state.description,
          company: state.company,
          image: state.image,
          isAlways: state.isAlways,
          isBirthday: state.isBirthday,
          startDate: state.startDate,
          endDate: state.endDate,
        }),
      );
    }
    setState({
      title: '',
      description: '',
      company: '',
      image: null,
      isAlways: '',
      isBirthday: false,
      startDate: undefined,
      endDate: undefined,
    });
    await dispatch(clearAllPromotions());
    await dispatch(fetchPromotionsByAdmin());
    navigate('/admin/admin-promotion');
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const quillChangeHandler = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      title: value,
    }));
    // const name = e.target.name;
    // const value = e.target.value;
    // setState((prevState) => {
    //   return { ...prevState, [name]: value };
    // });
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
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

  const switchBirthday = () => {
    setState({ ...state, isBirthday: !state.isBirthday });
  };

  // const handleDateTimeChange = (dateTime: Date | null) => {
  //   setSelectedDateTime(dateTime);
  // };

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
        <ReactQuill
          theme="snow"
          value={state.title}
          onChange={quillChangeHandler}
          style={{ height: '100px', width: '100%', marginBottom: '80px' }}
          modules={{
            toolbar: [
              [{ header: [false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ color: [] }], // Добавление модуля цвета текста
              [{ list: 'ordered' }, { list: 'bullet' }],
              // ['link', 'image', 'video'],
              ['clean'],
            ],
          }}
        />
        {/*<TextField*/}
        {/*  sx={{ width: '100%' }}*/}
        {/*  id="title"*/}
        {/*  value={state.title}*/}
        {/*  onChange={inputChangeHandler}*/}
        {/*  name="title"*/}
        {/*  required*/}
        {/*/>*/}

        <InputLabel id="description">Описание</InputLabel>
        <TextField
          sx={{ width: '100%' }}
          id="description"
          value={state.description}
          onChange={inputChangeHandler}
          name="description"
          required
        />
      </Grid>

      <Grid container direction="column" spacing={2} sx={{ mb: 1 }}>
        <Grid item xs>
          <InputLabel id="company">Кампания</InputLabel>
          <Select
            labelId="company"
            sx={{ width: '100%' }}
            id="company"
            value={state.company}
            onChange={selectChangeHandler}
            name="company"
            required
          >
            {companies &&
              companies.map((company) => (
                <MenuItem value={company._id} key={company._id}>
                  {company.title}
                </MenuItem>
              ))}
          </Select>
        </Grid>

        <Grid item xs>
          <InputLabel id="isAlways">Статус</InputLabel>
          <Select
            labelId="isAlways"
            sx={{ width: '100%' }}
            id="isAlways"
            value={state.isAlways.toString()}
            onChange={selectChangeHandler}
            name="isAlways"
            required
          >
            <MenuItem value={true.toString()}>Постоянная акция</MenuItem>
            <MenuItem value={false.toString()}>Временная акция</MenuItem>
          </Select>

          <InputLabel sx={{ mt: 2 }} id="startDate">
            Начало акции
          </InputLabel>
          <TextField
            type={'datetime-local'}
            sx={{ width: '100%' }}
            id="startDate"
            value={state.startDate || ''}
            onChange={inputChangeHandler}
            name="startDate"
          />

          <InputLabel sx={{ mt: 2 }} id="endDate">
            Конец акции
          </InputLabel>
          <TextField
            type={'datetime-local'}
            sx={{ width: '100%' }}
            id="endDate"
            value={state.endDate || ''}
            onChange={inputChangeHandler}
            name="endDate"
          />

          <FormControlLabel
            sx={{ mt: 2 }}
            control={<Switch onChange={switchBirthday} value={state.isBirthday} checked={state.isBirthday} />}
            label="Действует ли в Деньрождение?"
          />
        </Grid>

        {/*<Grid item xs>*/}
        {/*  <FileInput onChange={fileInputChangeHandler} name="image" label="Image" />*/}
        {/*</Grid>*/}
        {/*<Grid item xs>*/}
        {/*  <img*/}
        {/*    src={apiUrl + '/' + state.image}*/}
        {/*    className="card-img-top"*/}
        {/*    style={{*/}
        {/*      height: '200px',*/}
        {/*      objectFit: 'cover',*/}
        {/*    }}*/}
        {/*    alt="image"*/}
        {/*  />*/}
        {/*</Grid>*/}
      </Grid>

      {params.id ? (
        <Button disabled={disabled} style={{ marginBottom: '40px' }} type="submit" color="primary" variant="contained">
          Edit promotion
        </Button>
      ) : (
        <Button disabled={disabled} style={{ marginBottom: '40px' }} type="submit" color="primary" variant="contained">
          Add promotion
        </Button>
      )}
    </form>
  );
};

export default FormForPromotion;
