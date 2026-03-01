{permissionCategory.map((category, index) => (
    <tr key={index} name={category.val}>
        <td>{category.name}</td>
        <td>
            <label className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    // defaultChecked
                    name="create"
                    onChange={(e) => {
                        if (e.target.checked) {
                            formik.setFieldValue(category.val, {
                                ...formik.values[category.val],
                                create: e.target.checked,
                            });
                        } else {
                            delete formik.values[category.val].create;
                        }
                    }}
                />
                <span className="custom-control-label">&nbsp;</span>
            </label>
        </td>
        <td>
            <label className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    name="read"
                    onChange={(e) => {
                        if (e.target.checked) {
                            formik.setFieldValue(category.val, {
                                ...formik.values[category.val],
                                read: e.target.checked,
                            });
                        } else {
                            delete formik.values[category.val].read;
                        }
                    }}
                />
                <span className="custom-control-label">&nbsp;</span>
            </label>
        </td>
        <td>
            <label className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    name="update"
                    onChange={(e) => {
                        if (e.target.checked) {
                            formik.setFieldValue(category.val, {
                                ...formik.values[category.val],
                                update: e.target.checked,
                            });
                        } else {
                            delete formik.values[category.val].update;
                        }
                    }}
                />
                <span className="custom-control-label">&nbsp;</span>
            </label>
        </td>
        <td>
            <label className="custom-control custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-control-input"
                    name="delete"
                    onChange={(e) => {
                        if (e.target.checked) {
                            formik.setFieldValue(category.val, {
                                ...formik.values[category.val],
                                delete: e.target.checked,
                            });
                        } else {
                            delete formik.values[category.val].delete;
                        }
                    }}
                />
                <span className="custom-control-label">&nbsp;</span>
            </label>
        </td>
    </tr>
))}