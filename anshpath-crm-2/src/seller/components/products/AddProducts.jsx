// import React from 'react'

// const AddProducts = () => {
//   return (
//     <Container className="pf-container">
//       <Card className="pf-card">
//         <Card.Header className="pf-header">
//           <h5 className="pf-title">
//             <FiPackage className="me-2" />
//             Add Automobile Product
//           </h5>
//         </Card.Header>
//         <Card.Body className="pf-body">
//           {isSubmitted ? (
//             <div className="pf-success">
//               <FiCheckCircle className="pf-success-icon" />
//               <h4 className="pf-success-title">Success!</h4>
//               <p className="pf-success-message">Product has been added successfully.</p>
//               <Button 
//                 variant="primary" 
//                 className="pf-btn pf-new-btn"
//                 onClick={handleReset}
//               >
//                 <FiPackage className="me-1" />
//                 Add Another Product
//               </Button>
//             </div>
//           ) : (
//             <Form onSubmit={handleSubmit} className="pf-form">
//               {/* Enhanced Product Image Upload at the top */}
//               <div className="pf-photo-container">
//                 <div className="pf-photo-preview">
//                   {formData.productImage ? (
//                     <img src={formData.productImage} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                   ) : (
//                     <FiImage size={48} color="#a0aec0" />
//                   )}
//                 </div>
//                 <div className="pf-photo-upload">
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                   />
//                   <Button
//                     variant="outline-secondary"
//                     className="pf-photo-upload-btn"
//                     onClick={triggerFileInput}
//                   >
//                     <FiImage className="me-1" />
//                     Upload Product Image
//                   </Button>
//                   <div className="pf-photo-hint">JPG or PNG, max 2MB</div>
//                 </div>
//               </div>

//               {/* All fields arranged in rows with 2 columns each */}
//               <Row className="mb-4">
//                 <Col md={6} className="mb-3 mb-md-0">
//                   <Form.Group controlId="productName">
//                     <Form.Label className="pf-label pf-required">
//                       <FiTag size={16} />
//                       Product Name
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="productName"
//                       value={formData.productName}
//                       onChange={handleChange}
//                       isInvalid={!!errors.productName}
//                       className="pf-input"
//                       placeholder="e.g., Engine Oil 5W-30"
//                     />
//                     <Form.Control.Feedback type="invalid" className="pf-error">
//                       {errors.productName}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="category">
//                     <Form.Label className="pf-label pf-required">
//                       <FiArchive size={16} />
//                       Category
//                     </Form.Label>
//                     <Form.Select
//                       name="category"
//                       value={formData.category}
//                       onChange={handleChange}
//                       isInvalid={!!errors.category}
//                       className="pf-input"
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map((category) => (
//                         <option key={category} value={category}>
//                           {category}
//                         </option>
//                       ))}
//                     </Form.Select>
//                     <Form.Control.Feedback type="invalid" className="pf-error">
//                       {errors.category}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-4">
//                 <Col md={6} className="mb-3 mb-md-0">
//                   <Form.Group controlId="brand">
//                     <Form.Label className="pf-label pf-required">
//                       <FiTag size={16} />
//                       Brand
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="brand"
//                       value={formData.brand}
//                       onChange={handleChange}
//                       isInvalid={!!errors.brand}
//                       className="pf-input"
//                       placeholder="e.g., Castrol"
//                     />
//                     <Form.Control.Feedback type="invalid" className="pf-error">
//                       {errors.brand}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="vehicleCompatibility">
//                     <Form.Label className="pf-label">
//                       <FiTruck size={16} />
//                       Vehicle Compatibility
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="vehicleCompatibility"
//                       value={formData.vehicleCompatibility}
//                       onChange={handleChange}
//                       className="pf-input"
//                       placeholder="e.g., Maruti Swift 2015–2020"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-4">
//                 <Col md={6} className="mb-3 mb-md-0">
//                   <Form.Group controlId="price">
//                     <Form.Label className="pf-label pf-required">
//                       <FiDollarSign size={16} />
//                       Price (₹)
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="price"
//                       value={formData.price}
//                       onChange={handleChange}
//                       isInvalid={!!errors.price}
//                       className="pf-input"
//                       placeholder="e.g., 1200"
//                     />
//                     <Form.Control.Feedback type="invalid" className="pf-error">
//                       {errors.price}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="discountPrice">
//                     <Form.Label className="pf-label">
//                       <FiDollarSign size={16} />
//                       Discounted Price (₹)
//                     </Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="discountPrice"
//                       value={formData.discountPrice}
//                       onChange={handleChange}
//                       isInvalid={!!errors.discountPrice}
//                       className="pf-input"
//                       placeholder="e.g., 999"
//                     />
//                     <Form.Control.Feedback type="invalid" className="pf-error">
//                       {errors.discountPrice}
//                     </Form.Control.Feedback>
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-4">
//                 <Col md={6} className="mb-3 mb-md-0">
//                   <Form.Group controlId="stockStatus">
//                     <Form.Label className="pf-label">
//                       <FiArchive size={16} />
//                       Stock Status
//                     </Form.Label>
//                     <Form.Select
//                       name="stockStatus"
//                       value={formData.stockStatus}
//                       onChange={handleChange}
//                       className="pf-input"
//                     >
//                       {stockStatusOptions.map((status) => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </Form.Select>
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group controlId="sku">
//                     <Form.Label className="pf-label">
//                       <FiFileText size={16} />
//                       Product SKU
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="sku"
//                       value={formData.sku}
//                       onChange={handleChange}
//                       className="pf-input"
//                       placeholder="e.g., PRO-ENG-1054"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-4">
//                 <Col md={6} className="mb-3 mb-md-0">
//                   <Form.Group controlId="warranty">
//                     <Form.Label className="pf-label">
//                       <FiFileText size={16} />
//                       Warranty
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="warranty"
//                       value={formData.warranty}
//                       onChange={handleChange}
//                       className="pf-input"
//                       placeholder="e.g., 6 Months Manufacturer Warranty"
//                     />
//                   </Form.Group>
//                 </Col>
//                  <Col md={6}>
//                   <Form.Group controlId="keyFeatures">
//                     <Form.Label className="pf-label">
//                       <FiFileText size={16} />
//                       Key Features
//                     </Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       name="keyFeatures"
//                       value={formData.keyFeatures}
//                       onChange={handleChange}
//                       rows={3}
//                       className="pf-input pf-textarea form-control"
//                       placeholder="Bullet points about product features"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-4">
//                 <Col md={6}>
//                   <Form.Group controlId="shortDescription">
//                     <Form.Label className="pf-label">
//                       <FiFileText size={16} />
//                       Short Description
//                     </Form.Label>
//                     <Form.Control
//                       as="textarea"
//                       name="shortDescription"
//                       value={formData.shortDescription}
//                       onChange={handleChange}
//                       rows={2}
//                       className="pf-input pf-textarea"
//                       placeholder="Short 1-2 line summary"
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row className="mb-4">
                
//               </Row>

//               <div className="pf-actions">
//                 <Button 
//                   variant="outline-secondary" 
//                   className="pf-btn pf-cancel-btn"
//                   onClick={handleReset}
//                 >
//                   Reset
//                 </Button>
//                 <Button 
//                   variant="primary" 
//                   type="submit"
//                   className="pf-btn pf-submit-btn"
//                 >
//                   Add Product
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default AddProducts;

import React from 'react'

const AddProducts = () => {
  return (
    <div>AddProducts</div>
  )
}

export default AddProducts