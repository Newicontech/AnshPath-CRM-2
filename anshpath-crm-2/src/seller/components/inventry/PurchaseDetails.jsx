import React, { useState, useRef } from "react";
import "./PurchaseDetails.css";
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";

// PDF Styles
const pdfStyles = StyleSheet.create({
  page: { padding: 24, fontSize: 12, fontFamily: "Helvetica" },
  header: { color: "#4361ee", fontSize: 22, textAlign: "center", marginBottom: 4, fontWeight: "bold" },
  subHeader: { textAlign: "center", fontSize: 12, marginBottom: 12 },
  section: { marginBottom: 8 },
  fieldContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 6,
    borderBottom: "1px solid #eee",
    paddingBottom: 4
  },
  fieldLabel: {
    fontWeight: "bold",
    width: 120,
    color: "#4361ee"
  },
  fieldValue: {
    flex: 1,
    paddingLeft: 8
  },
  table: {
    width: "100%",
    marginBottom: 12,
    borderCollapse: "collapse"
  },
  tableHeader: {
    backgroundColor: "#4361ee",
    color: "#fff",
    fontWeight: "bold",
    padding: 8,
    textAlign: "left",
    border: "1px solid #4361ee"
  },
  tableCell: {
    padding: 8,
    border: "1px solid #ddd",
    textAlign: "left"
  },
  summary: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 4
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 4
  },
  summaryTotal: {
    borderTop: "1px solid #ddd",
    paddingTop: 8,
    marginTop: 8,
    fontWeight: "bold"
  }
});

// PDF Component
const PurchaseOrderPDF = ({ order }) => (
  <Document>
    if (!order || !order.items || !order.summary) return null;
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.header}>AnshPath Pvt Ltd</Text>
      <Text style={pdfStyles.subHeader}>
        123 Business Street, City, State - 400001 | Phone: +91 9876543210 | Email: contact@anshpath.com
      </Text>
      <Text style={{
        textAlign: "center",
        fontSize: 16,
        marginBottom: 12,
        marginTop: 8,
        fontWeight: "bold",
        color: "#4361ee"
      }}>PURCHASE ORDER</Text>

      <View style={pdfStyles.section}>
        {
          [
            ["Supplier", order.supplierName],
            ["Vendor Code", order.vendorCode],
            ["Contact", order.contactNo],
            ["PO Number", order.purchaseOrderNo],
            ["Date", new Date(order.date).toLocaleDateString("en-GB")],
            ["Status", order.status],
          ].map(([label, value]) => (
            <View style={pdfStyles.fieldContainer} key={label}>
              <Text style={pdfStyles.fieldLabel}>{label}:</Text>
              <Text style={pdfStyles.fieldValue}>{value}</Text>
            </View>
          ))}
      </View>

      <View style={{ marginTop: 16 }}>
        <Text style={{
          fontWeight: "bold",
          marginBottom: 8,
          color: "#4361ee"
        }}>Items:</Text>

        <View style={pdfStyles.table}>
          <View style={{ flexDirection: "row" }}>
            {
              [
                ["Part No.", "10%"],
                ["Description", "25%"],
                ["MEG", "10%"],
                ["Qty", "10%"],
                ["MRP", "15%"],
                ["Rate", "15%"],
                ["Disc.%", "15%"],
              ].map(([th, w]) => (
                <Text key={th} style={[pdfStyles.tableHeader, { width: w }]}>
                  {th}
                </Text>
              ))}
          </View>

          {order.items.map((item) => (
            <View style={{ flexDirection: "row" }} key={item.sr}>
              <Text style={[pdfStyles.tableCell, { width: "10%" }]}>{item.sr}</Text>
              <Text style={[pdfStyles.tableCell, { width: "25%" }]}>{item.partDetails}</Text>
              <Text style={[pdfStyles.tableCell, { width: "10%" }]}>{item.meg}</Text>
              <Text style={[pdfStyles.tableCell, { width: "10%" }]}>{item.qty}</Text>
              <Text style={[pdfStyles.tableCell, { width: "15%" }]}>{item.mrp}</Text>
              <Text style={[pdfStyles.tableCell, { width: "15%" }]}>{item.rate}</Text>
              <Text style={[pdfStyles.tableCell, { width: "15%" }]}>{item.discount}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={pdfStyles.section}>
        {
          [
            ["Basic Amount", `₹${order.summary.basicAmount.toFixed(2)}`],
            ["Discount", `-₹${(order.summary.basicAmount * order.summary.discount) / 100}`],
            ["GST (18%)", `₹${order.summary.gstAmount.toFixed(2)}`],
            ["Other Charges", `₹${order.summary.otherCharges.toFixed(2)}`],
          ].map(([label, value]) => (
            <View style={pdfStyles.fieldContainer} key={label}>
              <Text style={pdfStyles.fieldLabel}>{label}:</Text>
              <Text style={pdfStyles.fieldValue}>{value}</Text>
            </View>
          ))}

        <View style={[pdfStyles.fieldContainer, pdfStyles.summaryTotal]}>
          <Text style={pdfStyles.fieldLabel}>Net Total:</Text>
          <Text style={pdfStyles.fieldValue}>₹{order.summary.netTotal.toFixed(2)}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Utility for summary calculation
function recalculateSummary(items, otherCharges = 0) {
  const basicAmount = items.reduce((sum, item) => sum + ((Number(item.qty) || 0) * (Number(item.rate) || 0)), 0);
  const discountAmount = items.reduce((sum, item) => sum + (((Number(item.qty) || 0) * (Number(item.rate) || 0)) * (Number(item.discount) || 0) / 100), 0);
  const gstAmount = ((basicAmount - discountAmount) * 0.18);
  const netTotal = basicAmount - discountAmount + gstAmount + Number(otherCharges || 0);
  return {
    basicAmount: Number.isFinite(basicAmount) ? basicAmount : 0,
    discount: basicAmount > 0 && Number.isFinite(discountAmount)
      ? ((discountAmount / basicAmount) * 100)
      : 0,
    gstAmount: basicAmount > 0 && Number.isFinite(gstAmount) ? gstAmount : 0,
    otherCharges: Number.isFinite(otherCharges) ? otherCharges : 0,
    netTotal: basicAmount > 0 && Number.isFinite(netTotal) ? netTotal : 0
  };
}

// Status badge color
const statusColor = {
  Pending: "warning",
  Approved: "success",
  Shipped: "primary"
};

// Main Component
const PurchaseDetails = () => {
  // Sample data
  const [orders, setOrders] = useState([
    {
      id: 1,
      supplierName: "ABC Suppliers",
      contactNo: "9876543210",
      vendorCode: "V001",
      purchaseOrderNo: "PO-2023-001",
      date: "2023-05-15",
      status: "Approved",
      items: [
        { sr: 1, partDetails: "Air Filter", meg: "PCS", qty: 10, mrp: 120, rate: 100, discount: 5 },
        { sr: 2, partDetails: "Oil Filter", meg: "PCS", qty: 5, mrp: 250, rate: 200, discount: 10 }
      ],
      summary: {
        basicAmount: 2000,
        discount: 7.5,
        gstAmount: 342,
        otherCharges: 100,
        netTotal: 2242
      }
    },
    {
      id: 2,
      supplierName: "XYZ Traders",
      contactNo: "8765432109",
      vendorCode: "V002",
      purchaseOrderNo: "PO-2023-002",
      date: "2023-05-18",
      status: "Pending",
      items: [
        { sr: 1, partDetails: "Oil Seal 35x55x8", meg: "PCS", qty: 5, mrp: 250, rate: 220, discount: 5 },
        { sr: 2, partDetails: "V Belt A55", meg: "PCS", qty: 2, mrp: 350, rate: 320, discount: 8 }
      ],
      summary: {
        basicAmount: 1560,
        discount: 6.4,
        gstAmount: 259.2,
        otherCharges: 50,
        netTotal: 1744.4
      }
    },
    {
      id: 3,
      supplierName: "DEF Traders",
      contactNo: "8765532119",
      vendorCode: "V003",
      purchaseOrderNo: "PO-2023-003",
      date: "2023-05-19",
      status: "Shipped",
      items: [
        { sr: 1, partDetails: "Oil Seal 35x55x8", meg: "PCS", qty: 5, mrp: 250, rate: 220, discount: 5 },
        { sr: 2, partDetails: "V Belt A55", meg: "PCS", qty: 2, mrp: 350, rate: 320, discount: 8 }
      ],
      summary: {
        basicAmount: 1560,
        discount: 6.4,
        gstAmount: 259.2,
        otherCharges: 50,
        netTotal: 1744.4
      }
    }
  ]);
  const [filter, setFilter] = useState("");
  const [modal, setModal] = useState({ open: false, order: null, mode: "view" });
  const printPdf = async (order) => {
    const blob = await pdf(<PurchaseOrderPDF order={order} />).toBlob();
    const url = URL.createObjectURL(blob);

    // create hidden iframe & load pdf
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    document.body.appendChild(iframe);

    // print when loaded
    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    };
  };
  /* ---------- helper actions ---------- */
  const deleteOrder = (id) => setOrders(orders.filter((o) => o.id !== id));
  const saveOrder = (updated) => {
    const items = (updated.items || []).map((item, idx) => ({
      ...item, sr: idx + 1, qty: Number(item.qty) || 0,
      rate: Number(item.rate) || 0,
      discount: Number(item.discount) || 0,
      mrp: Number(item.mrp) || 0,
      partDetails: item.partDetails || "",
      meg: item.meg || "PCS"
    }));

    const otherCharges = Number(
      updated.summary && updated.summary.otherCharges != null
        ? updated.summary.otherCharges
        : 0
    );
    const summary = recalculateSummary(items, otherCharges);
    setOrders(orders.map((o) =>
      o.id === updated.id ? { ...updated, items, summary } : o
    ));
    setModal({ open: false, order: null, mode: "view" });
    // setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
    // setModal({ open: false, order: null, mode: "view" });
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) =>
    o.supplierName.toLowerCase().includes(filter.toLowerCase())
  );

  // Card grid
  return (
    <div className="purchase-order-container-POD">
      <div className="header-POD">
        <h2>
          <i className="fas fa-clipboard-list me-2"></i>
          Purchase Details
        </h2>
        <input
          className="form-control search-input-POD"
          placeholder="Search by Supplier Name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="row g-4">
        {filteredOrders.map((order) => (
          <div className="col-lg-4 col-md-6 col-12" key={order.id}>
            <div className="po-card-POD">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">{order.supplierName}</span>
                <span className={`badge bg-${statusColor[order.status] || "secondary"}`}>
                  {order.status}
                </span>
              </div>
              <div className="mb-1">
                <span className="text-muted">PO#</span>{" "}
                <span className="fw-bold text-primary">{order.purchaseOrderNo}</span>
              </div>
              <div className="mb-1">
                <span className="text-muted">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString("en-GB")}
              </div>
              <div className="mb-1">
                <span className="text-muted">Vendor:</span> {order.vendorCode}
              </div>
              <div className="mb-1">
                <span className="text-muted">Line Items:</span> {order.items.length}
              </div>
              <div className="mb-2">
                <span className="text-muted">Total:</span>{" "}
                <span className="fw-bold text-success">
                  ₹{order.summary.netTotal.toFixed(2)}
                </span>
              </div>
              <div className="d-flex gap-2 mt-2 ">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setModal({ open: true, order, mode: "view" })}
                >
                  <i className="fas fa-eye"></i> View
                </button>
                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => setModal({ open: true, order, mode: "edit" })}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteOrder(order.id)}
                >
                  <i className="fas fa-trash"></i> Del
                </button>
                {order && order.items && order.summary && order.items.length > 0 && (
                  <PDFDownloadLink
                    document={<PurchaseOrderPDF order={order} />}
                    fileName={`PO_${order.purchaseOrderNo}.pdf`}
                    className="btn btn-sm btn-outline-danger"
                    style={{ textDecoration: "none" }}
                  >
                    {({ loading }) => (
                      <>
                        <i className="fas fa-file-pdf"></i> {loading ? "..." : "PDF"}
                      </>
                    )}
                  </PDFDownloadLink>
                )}
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    printPdf(order);
                  }}
                >
                  <i className="fas fa-print"></i> Print
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for View/Edit*/}
      {modal.open && (
        <Modal onClose={() => setModal({ open: false, order: null, mode: "view" })}>
          {modal.mode === "edit" ? (
            <EditOrderForm order={modal.order} onSave={saveOrder} onCancel={() => setModal({ open: false, order: null, mode: "view" })} />
          ) : (
            <ViewOrder order={modal.order} />
          )}
        </Modal>
      )}
    </div>
  );
};

// Modal component
function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop-POD">
      <div className="modal-content-POD">
        <button className="modal-close-POD" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}

// View Order (for view/print)
function ViewOrder({ order }) {
  return (
    <div className="view-order-POD">
      <div className="text-center mb-2">
        <h3 className="mb-0" style={{ color: "#4361ee" }}>AnshPath Pvt Ltd</h3>
        <div style={{ fontSize: 13 }}>
          123 Business Street, City, State - 400001<br />
          Phone: +91 9876543210 | Email: contact@anshpath.com
        </div>
      </div>
      <h4 className="text-center mb-3">PURCHASE ORDER</h4>

      <div className="form-container-POD">
        {
          [
            ["Supplier", order.supplierName],
            ["Vendor Code", order.vendorCode],
            ["Contact", order.contactNo],
            ["PO Number", order.purchaseOrderNo],
            ["Date", new Date(order.date).toLocaleDateString("en-GB")],
            ["Status", order.status],
          ].map(([label, value]) => (
            <div className="form-group-POD" key={label}>
              <label className="form-label-POD">{label}:</label>
              <div className="form-control-static-POD">{value}</div>
            </div>
          ))}
      </div>

      <div className="table-responsive mb-2">
        <table className="table table-bordered table-striped mb-0">
          <thead style={{ background: "#4361ee", color: "#fff" }}>
            <tr>
              {
                ["Part No.", "Description", "MEG", "Qty", "MRP", "Rate", "Disc.%"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.sr}>
                <td>{item.sr}</td>
                <td>{item.partDetails}</td>
                <td>{item.meg}</td>
                <td>{item.qty}</td>
                <td>{item.mrp}</td>
                <td>{item.rate}</td>
                <td>{item.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="summary-box-POD mt-2">
        {
          [
            ["Basic Amount", `₹${order.summary.basicAmount.toFixed(2)}`],
            ["Discount", `-₹${(order.summary.basicAmount * order.summary.discount) / 100}`],
            ["GST (18%)", `₹${order.summary.gstAmount.toFixed(2)}`],
            ["Other Charges", `₹${order.summary.otherCharges.toFixed(2)}`],
            ["Net Total", `₹${order.summary.netTotal.toFixed(2)}`],
          ].map(([label, value], idx) => (
            <div
              key={label}
              className="form-group-POD"
              style={idx === 4 ? { borderTop: "1px solid #ccc", marginTop: 8, paddingTop: 8 } : {}}
            >
              <label className="form-label-POD">{label}:</label>
              <div className="form-control-static-POD">{value}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

// Edit Order Form
function EditOrderForm({ order, onSave, onCancel }) {
  const [form, setForm] = useState(JSON.parse(JSON.stringify(order)));
  React.useEffect(() => {
    setForm(JSON.parse(JSON.stringify(order)));
  }, [order]);

  const updateItem = (sr, field, value) => {
    setForm((f) => {
      const items = f.items.map((item) =>
        item.sr === sr ? { ...item, [field]: value } : item
      );
      return { ...f, items, summary: recalculateSummary(items, f.summary.otherCharges) };
    });
  };

  const updateField = (field, value) => {
    setForm((f) => {
      if (field === "otherCharges") {
        return { ...f, summary: recalculateSummary(f.items, value) };
      }
      return { ...f, [field]: value };
    });
  };

  return (
    <div className="edit-order-form-POD">
      <h4 className="mb-3">Edit Purchase Order</h4>

      <div className="form-container-POD">
        <div className="form-group-POD">
          <label className="form-label-POD">Supplier:</label>
          <input
            value={form.supplierName}
            onChange={e => updateField("supplierName", e.target.value)}
            className="form-control-POD"
          />
        </div>
        <div className="form-group-POD">
          <label className="form-label-POD">Vendor Code:</label>
          <input
            value={form.vendorCode}
            onChange={e => updateField("vendorCode", e.target.value)}
            className="form-control-POD"
          />
        </div>
        <div className="form-group-POD">
          <label className="form-label-POD">Contact:</label>
          <input
            value={form.contactNo}
            onChange={e => updateField("contactNo", e.target.value)}
            className="form-control-POD"
          />
        </div>
        <div className="form-group-POD">
          <label className="form-label-POD">PO Number:</label>
          <input
            value={form.purchaseOrderNo}
            onChange={e => updateField("purchaseOrderNo", e.target.value)}
            className="form-control-POD"
          />
        </div>
        <div className="form-group-POD">
          <label className="form-label-POD">Date:</label>
          <input
            type="date"
            value={form.date}
            onChange={e => updateField("date", e.target.value)}
            className="form-control-POD"
          />
        </div>
        <div className="form-group-POD">
          <label className="form-label-POD">Status:</label>
          <select
            value={form.status}
            onChange={e => updateField("status", e.target.value)}
            className="form-control-POD"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Shipped">Shipped</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="table table-bordered table-striped mb-0" style={{ minWidth: 800 }}>
          <thead>
            <tr>
              <th style={{ width: 60 }}>Part No.</th>
              <th style={{ width: 180 }}>Description</th>
              <th style={{ width: 80 }}>MEG</th>
              <th style={{ width: 70 }}>Qty</th>
              <th style={{ width: 90 }}>MRP</th>
              <th style={{ width: 90 }}>Rate</th>
              <th style={{ width: 90 }}>Disc.%</th>
              <th style={{ width: 90 }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {form.items.map((item) => (
              <tr key={item.sr}>
                <td>{item.sr}</td>
                <td>
                  <input
                    value={item.partDetails}
                    onChange={e => updateItem(item.sr, "partDetails", e.target.value)}
                    className="form-control-POD"
                  />
                </td>
                <td>
                  <input
                    value={item.meg}
                    onChange={e => updateItem(item.sr, "meg", e.target.value)}
                    className="form-control-POD"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.qty}
                    min={1}
                    onChange={e => updateItem(item.sr, "qty", parseInt(e.target.value))}
                    className="form-control-POD"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.mrp}
                    min={0}
                    step={0.01}
                    onChange={e => updateItem(item.sr, "mrp", parseFloat(e.target.value))}
                    className="form-control-POD"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.rate}
                    min={0}
                    step={0.01}
                    onChange={e => updateItem(item.sr, "rate", parseFloat(e.target.value))}
                    className="form-control-POD"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.discount}
                    min={0}
                    max={100}
                    step={0.1}
                    onChange={e => updateItem(item.sr, "discount", parseFloat(e.target.value))}
                    className="form-control-POD"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    // onClick={() => setForm(f => ({
                    //   // ...f,
                    //     items= f.items.filter(i => i.sr !== item.sr).map((i, idx) => ({ ...i, sr: idx + 1 })),
                    //   summary: recalculateSummary(f.items.filter(i => i.sr !== item.sr), f.summary.otherCharges)
                    // }))}
                    onClick={() => setForm(f => {
                      const items = f.items
                        .filter(i => i.sr !== item.sr)
                        .map((i, idx) => ({
                          ...i,
                          sr: idx + 1,
                          qty: Number(i.qty) || 0,
                          rate: Number(i.rate) || 0,
                          discount: Number(i.discount) || 0,
                          mrp: Number(i.mrp) || 0,
                          partDetails: i.partDetails || "",
                          meg: i.meg || "PCS"
                        }));
                      return {
                        ...f,
                        items,
                        summary: recalculateSummary(items, f.summary.otherCharges)
                      };
                    })}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-outline-primary btn-sm mt-2"
          onClick={() => setForm(f => {
            const items = [...f.items, {
              sr: f.items.length > 0 ? Math.max(...f.items.map(i => i.sr)) + 1 : 1,
              partDetails: "",
              meg: "PCS",
              qty: 1,
              mrp: 0,
              rate: 0,
              discount: 0
            }];
            return { ...f, items, summary: recalculateSummary(items, f.summary.otherCharges) };
          })}
        >
          + Add New
        </button>
      </div>

      <div className="summary-box-POD mt-3">
        <div className="form-group-POD">
          <label className="form-label-POD">Basic Amount:</label>
          <div className="form-control-static-POD">₹{form.summary.basicAmount.toFixed(2)}</div>
        </div>
        <div className="form-group-POD">
          <label className="form-label-POD">Discount ({form.summary.discount.toFixed(2)}%):</label>
          <div className="form-control-static-POD">-₹{(form.summary.basicAmount * form.summary.discount / 100).toFixed(2)}</div>
        </div>
        <div className="form-group-POD">
          <label className="form-label-POD">GST (18%):</label>
          <div className="form-control-static-POD">₹{form.summary.gstAmount.toFixed(2)}</div>
        </div>
        <div className="form-group-POD">
          <label className="form-label-POD">Other Charges:</label>
          <input
            type="number"
            value={form.summary.otherCharges}
            min={0}
            step={0.01}
            onChange={e => updateField("otherCharges", parseFloat(e.target.value))}
            className="form-control-POD d-inline-block"
            style={{ width: 100 }}
          />
        </div>
        <div className="form-group-POD summary-total" style={{ borderTop: "1px solid #ccc", marginTop: 8, paddingTop: 8 }}>
          <label className="form-label-POD">Net Total:</label>
          <div className="form-control-static-POD">₹{form.summary.netTotal.toFixed(2)}</div>
        </div>
      </div>

      <div className="d-flex gap-2 mt-3">
        <button className="btn btn-success" onClick={() => onSave(form)}>Save</button>
        <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default PurchaseDetails;