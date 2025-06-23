import React, { useState, useRef } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { FiTool, FiTag, FiClock, FiDollarSign, FiImage, FiMapPin, FiCalendar, FiCheckCircle, FiX, FiCheck } from 'react-icons/fi';
import { GiAutoRepair, GiCarWheel } from 'react-icons/gi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddServices.css';

const serviceCategories = ['Car', 'Bike', 'Truck', 'Electric Vehicle'];
const vehicleTypes = ['Hatchback', 'Sedan', 'SUV', 'Bike', 'Scooter', 'Pickup', 'Van'];
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlotOptions = [
  '9:00 AM - 12:00 PM',
  '12:00 PM - 3:00 PM',
  '3:00 PM - 6:00 PM',
  '6:00 PM - 9:00 PM'
];

const AddServices = () => {
  const [formData, setFormData] = useState({
    serviceTitle: '',
    serviceCategory: [],
    vehicleTypes: [],
    description: '',
    estimatedDuration: '',
    price: '',
    discount: '',
    serviceImages: [],
    location: '',
    city: '',
    state: '',
    pincode: '',
    availabilityDays: [],
    timeSlot: '', // single select
    status: 'active'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showVehicleTypesDropdown, setShowVehicleTypesDropdown] = useState(false);

  // --- Handlers ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setFormData((prev) => ({
        ...prev,
        serviceImages: [...prev.serviceImages, ...newImages]
      }));
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.serviceImages];
    URL.revokeObjectURL(updatedImages[index].preview);
    updatedImages.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      serviceImages: updatedImages
    }));
  };

  // --- Multi-select logic ---
  const toggleCategory = (category) => {
    setFormData((prev) => ({
      ...prev,
      serviceCategory: prev.serviceCategory.includes(category)
        ? prev.serviceCategory.filter(c => c !== category)
        : [...prev.serviceCategory, category]
    }));
  };

  const toggleVehicleType = (type) => {
    setFormData((prev) => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(type)
        ? prev.vehicleTypes.filter(t => t !== type)
        : [...prev.vehicleTypes, type]
    }));
  };

  const toggleDay = (day) => {
    setFormData((prev) => ({
      ...prev,
      availabilityDays: prev.availabilityDays.includes(day)
        ? prev.availabilityDays.filter(d => d !== day)
        : [...prev.availabilityDays, day]
    }));
  };

  const toggleStatus = () => {
    setFormData((prev) => ({
      ...prev,
      status: prev.status === 'active' ? 'inactive' : 'active'
    }));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.serviceTitle) newErrors.serviceTitle = 'This field is required';
    if (!formData.serviceCategory.length) newErrors.serviceCategory = 'Select at least one category';
    if (!formData.description) newErrors.description = 'This field is required';
    if (!formData.price) newErrors.price = 'This field is required';
    if (formData.price && isNaN(formData.price)) newErrors.price = 'Enter a valid price';
    if (formData.discount && isNaN(formData.discount)) newErrors.discount = 'Enter a valid discount';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    formData.serviceImages.forEach(image => URL.revokeObjectURL(image.preview));
    setFormData({
      serviceTitle: '',
      serviceCategory: [],
      vehicleTypes: [],
      description: '',
      estimatedDuration: '',
      price: '',
      discount: '',
      serviceImages: [],
      location: '',
      city: '',
      state: '',
      pincode: '',
      availabilityDays: [],
      timeSlot: '',
      status: 'active'
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // --- UI ---
  return (
    <Container className="sf-container">
      <Card className="sf-card">
        <Card.Header className="sf-header">
          <h2 className="sf-title">
            <FiTool className="me-2" />
            Add Vehicle Service
          </h2>
          <GiAutoRepair className="sf-floating-icon-1" />
        </Card.Header>
        <Card.Body className="sf-body">
          {isSubmitted ? (
            <div className="sf-success">
              <FiCheckCircle className="sf-success-icon" />
              <h4 className="sf-success-title">Success!</h4>
              <p className="sf-success-message">Service has been added successfully.</p>
              <Button
                variant="primary"
                className="sf-btn sf-new-btn"
                onClick={handleReset}
              >
                <FiTool className="me-1" />
                Add Another Service
              </Button>
            </div>
          ) : (
            <Form onSubmit={handleSubmit} className="sf-form">
              {/* Service Images at the top */}
              <div className="sf-photo-container">
                <div className="sf-photo-preview">
                  {formData.serviceImages.length > 0 ? (
                    <img src={formData.serviceImages[0].preview} alt="Service" />
                  ) : (
                    <FiImage size={48} color="#a0aec0" />
                  )}
                </div>
                <div className="sf-photo-upload">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                  />
                  <Button
                    variant="outline-secondary"
                    className="sf-photo-upload-btn"
                    onClick={triggerFileInput}
                  >
                    <FiImage className="me-1" />
                    Upload Images
                  </Button>
                  <div className="sf-photo-hint">JPG or PNG, max 2MB each</div>
                </div>
                <div className="sf-photo-list" style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                  {formData.serviceImages.map((img, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={img.preview} alt={`Service ${idx}`} style={{ width: 60, height: 60, borderRadius: 8, objectFit: 'cover', border: '2px solid #4361ee' }} />
                      <span
                        className="sf-photo-remove"
                        onClick={() => removeImage(idx)}
                      >
                        <FiX size={12} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Title & Category */}
              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="serviceTitle">
                    <Form.Label className="sf-label sf-required">
                      <FiTag size={16} />
                      Service Title
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="serviceTitle"
                      value={formData.serviceTitle}
                      onChange={handleChange}
                      isInvalid={!!errors.serviceTitle}
                      className="sf-input"
                      placeholder="e.g., Car Oil Change"
                    />
                    <Form.Control.Feedback type="invalid" className="sf-error">
                      {errors.serviceTitle}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="serviceCategory">
                    <Form.Label className="sf-label sf-required">
                      <FiTag size={16} />
                      Service Category
                    </Form.Label>
                    <div className="sf-multiselect-dropdown">
                      <div
                        className="sf-multiselect-selected"
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        tabIndex={0}
                      >
                        {formData.serviceCategory.length > 0 ? (
                          <div>
                            {formData.serviceCategory.map(cat => (
                              <span key={cat} className="sf-multiselect-tag">
                                {cat}
                                <span
                                  className="sf-multiselect-tag-remove"
                                  onClick={e => {
                                    e.stopPropagation();
                                    toggleCategory(cat);
                                  }}
                                >
                                  <FiX size={12} />
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span>Select categories</span>
                        )}
                        <span className="sf-multiselect-arrow">&#9662;</span>
                      </div>
                      {showCategoryDropdown && (
                        <div className="sf-multiselect-options">
                          {serviceCategories.map(category => (
                            <div
                              key={category}
                              className={`sf-multiselect-option ${formData.serviceCategory.includes(category) ? 'selected' : ''}`}
                              onClick={() => {
                                toggleCategory(category);
                                setShowCategoryDropdown(false);
                              }}
                            >
                              {formData.serviceCategory.includes(category) && <FiCheck className="me-2" />}
                              {category}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.serviceCategory && (
                      <div className="sf-error">{errors.serviceCategory}</div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {/* Vehicle Types & Description */}
              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="vehicleTypes">
                    <Form.Label className="sf-label">
                      <GiCarWheel size={16} />
                      Vehicle Types Supported
                    </Form.Label>
                    <div className="sf-multiselect-dropdown">
                      <div
                        className="sf-multiselect-selected"
                        onClick={() => setShowVehicleTypesDropdown(!showVehicleTypesDropdown)}
                        tabIndex={0}
                      >
                        {formData.vehicleTypes.length > 0 ? (
                          <div>
                            {formData.vehicleTypes.map(type => (
                              <span key={type} className="sf-multiselect-tag">
                                {type}
                                <span
                                  className="sf-multiselect-tag-remove"
                                  onClick={e => {
                                    e.stopPropagation();
                                    toggleVehicleType(type);
                                  }}
                                >
                                  <FiX size={12} />
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span>Select vehicle types</span>
                        )}
                        <span className="sf-multiselect-arrow">&#9662;</span>
                      </div>
                      {showVehicleTypesDropdown && (
                        <div className="sf-multiselect-options">
                          {vehicleTypes.map(type => (
                            <div
                              key={type}
                              className={`sf-multiselect-option ${formData.vehicleTypes.includes(type) ? 'selected' : ''}`}
                              onClick={() => {
                                toggleVehicleType(type);
                                setShowVehicleTypesDropdown(false);
                              }}
                            >
                              {formData.vehicleTypes.includes(type) && <FiCheck className="me-2" />}
                              {type}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="description">
                    <Form.Label className="sf-label sf-required">
                      <FiTag size={16} />
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="sf-input sf-textarea"
                      placeholder="Detailed description of the service..."
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid" className="sf-error">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Duration, Price */}
              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="estimatedDuration">
                    <Form.Label className="sf-label">
                      <FiClock size={16} />
                      Estimated Duration (hours)
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="estimatedDuration"
                      value={formData.estimatedDuration}
                      onChange={handleChange}
                      className="sf-input"
                      placeholder="e.g., 1 hour"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="price">
                    <Form.Label className="sf-label sf-required">
                      <FiDollarSign size={16} />
                      Price (₹)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      isInvalid={!!errors.price}
                      className="sf-input"
                      placeholder="e.g., 1200"
                    />
                    <Form.Control.Feedback type="invalid" className="sf-error">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/*  Discount ,Location City, State, Pincode */}
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="discount">
                    <Form.Label className="sf-label">
                      <FiDollarSign size={16} />
                      Discount (₹)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      isInvalid={!!errors.discount}
                      className="sf-input"
                      placeholder="e.g., 200"
                    />
                    <Form.Control.Feedback type="invalid" className="sf-error">
                      {errors.discount}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="location">
                    <Form.Label className="sf-label">
                      <FiMapPin size={16} />
                      Location/Branch
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="sf-input"
                      placeholder="e.g., Main Workshop"
                    />
                  </Form.Group>
                </Col>
              </Row>

               {/* City, State */}
              <Row className="mb-4">
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="city">
                    <Form.Label className="sf-label">
                      <FiMapPin size={16} />
                      City
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="sf-input"
                      placeholder="e.g., Mumbai"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="state">
                    <Form.Label className="sf-label">
                      <FiMapPin size={16} />
                      State
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="sf-input"
                      placeholder="e.g., Maharashtra"
                    />
                  </Form.Group>
                </Col>
                </Row>

              {/*  Pincode ,Availability Days*/}
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="pincode">
                    <Form.Label className="sf-label">
                      <FiMapPin size={16} />
                      Pincode
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="sf-input"
                      placeholder="e.g., 400001"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3 mb-md-0">
                  <Form.Group controlId="availabilityDays">
                    <Form.Label className="sf-label">
                      <FiCalendar size={16} />
                      Availability Days
                    </Form.Label>
                    <div className="sf-checkbox-group">
                      {daysOfWeek.map(day => (
                        <label key={day} className="sf-checkbox-label">
                          <input
                            type="checkbox"
                            checked={formData.availabilityDays.includes(day)}
                            onChange={() => toggleDay(day)}
                            className="sf-checkbox-input"
                          />
                          {day}
                        </label>
                      ))}
                    </div>
                  </Form.Group>
                </Col>
              </Row>
 
              {/* Time Slot & Service Status */}
              <Row className="mb-4">
                 <Col md={6}>
                  <Form.Group controlId="timeSlot">
                    <Form.Label className="sf-label">
                      <FiClock size={16} />
                      Time Slot
                    </Form.Label>
                    <Form.Select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="sf-input"
                    >
                      <option value="">Select Time Slot</option>
                      {timeSlotOptions.map(slot => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="status">
                    <Form.Label className="sf-label">
                      <FiCheckCircle size={16} />
                      Service Status
                    </Form.Label>
                    <div className="d-flex align-items-center">
                      <label className="sf-toggle">
                        <input
                          type="checkbox"
                          checked={formData.status === 'active'}
                          onChange={toggleStatus}
                          className="sf-toggle-input"
                        />
                        <span className="sf-toggle-slider"></span>
                      </label>
                      <span className="ms-2">
                        {formData.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              {/* Actions */}
              <div className="sf-actions">
                <Button
                  variant="outline-secondary"
                  className="sf-btn sf-cancel-btn"
                  onClick={handleReset}
                  type="button"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="sf-btn sf-submit-btn"
                >
                  Save Service
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddServices;