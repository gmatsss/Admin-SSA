import React, { useEffect, useState, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Typography } from "@mui/material";
import { fetchData } from "../../../api/FetchData";

const BillingPlan = ({ setSelectedData }) => {
  const [data, setData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Declare a new state for loading

  useEffect(() => {
    fetchBillingPlans();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return date.toLocaleDateString("en-US", options);
  };

  const fetchBillingPlans = async () => {
    try {
      setIsLoading(true);
      const billingPlansResponse = await fetchData("Admin/getuserpaymentplans");
      console.log(billingPlansResponse);
      const paymentPlanIds = billingPlansResponse.paymentPlanIds;

      if (paymentPlanIds && paymentPlanIds.length > 0) {
        const billingDetails = await Promise.all(
          paymentPlanIds.map(async (id) => {
            try {
              const headers = {
                Authorization: "Token 08bf9295738475d4afc3362ba53678df",
                Accept: "application/vnd.moonclerk+json;version=1",
              };

              // Fetching billing plan details
              const planDetails = await fetchData(
                `moonclerk/api/customers/${id}`,
                "GET",
                null,
                headers
              );

              // Fetching form details using form_id from planDetails
              if (
                planDetails &&
                planDetails.customer &&
                planDetails.customer.form_id
              ) {
                const formId = planDetails.customer.form_id;
                const formDetails = await fetchData(
                  `moonclerk/api/forms/${formId}`,
                  "GET",
                  null,
                  headers
                );

                // Extracting and formatting additional fields from planDetails
                const subscription = planDetails.customer.subscription;

                return {
                  id: planDetails.customer.id, // Plan ID
                  title: formDetails.form.title, // Form Title
                  status: subscription.status,
                  start: formatDate(subscription.start),
                  firstPaymentAttempt: formatDate(
                    subscription.first_payment_attempt
                  ),
                  nextPaymentAttempt: formatDate(
                    subscription.next_payment_attempt
                  ),
                  currentPeriodStart: formatDate(
                    subscription.current_period_start
                  ),
                  currentPeriodEnd: formatDate(subscription.current_period_end),
                  managementUrl: planDetails.customer.management_url,
                };
              }
            } catch (error) {
              console.error(
                `Error fetching details for billing plan ID ${id}:`,
                error
              );
              return null; // Return null for errors
            }
          })
        );
        setIsLoading(false);
        setData(billingDetails); // Set data after all promises have resolved
      } else {
        console.log("No billing plans found.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching billing plans:", error);
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "Plan Name" },
      { accessorKey: "id", header: "Plan ID" },
    ],
    []
  );

  const getData = (row) => {
    setSelectedData(row.original); // Use setSelectedData directly
  };

  return (
    <div>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableMultiRowSelection={false}
        enableRowSelection
        getRowId={(row) => row._id}
        muiTableContainerProps={{ sx: { maxHeight: "200px" } }}
        muiTableBodyRowProps={({ row }) => ({
          onClick: (event) => {
            row.getToggleSelectedHandler()(event);
            getData(row);
          },
          sx: { cursor: "pointer" },
        })}
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection, isLoading }}
        positionToolbarAlertBanner={"none"}
      />
    </div>
  );
};

export default BillingPlan;
