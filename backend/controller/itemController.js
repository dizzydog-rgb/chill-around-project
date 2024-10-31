const itemModel = require("../models/itemModel");

// 獲取使用者物品的控制器
exports.getUseritemListId = async (req, res) => {
    try {
        // 從 URL 參數中提取 ID
        const UseritemListId = req.params.id;
        console.log("Fetching Budget with ID:", UseritemListId);

        // 從資料庫取得特定 ID 的景點資料
        const UseritemList = await itemModel.findUseritemListId(UseritemListId);
        console.log("UseritemList data fetched:", UseritemList);
        // 如果找不到資料，回傳 404
        if (!UseritemList) {
            return res.status(404).json({ message: "UseritemList not found" });
        }
        // 成功取得資料後回傳 JSON 給前端
        console.log("Useritemlist data to send:", UseritemList);
        // res.json({ data: UseritemList });
        res.json(UseritemList);
    } catch (error) {
        // 錯誤處理
        // console.error("Error fetching Useritemlist:", error);
        // res.status(500).json({ message: "Server Error" });
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// 獲得全部預算種類的控制器
exports.getItemCategory = async (req, res) => {
    try {
        const { itemCategories, itemdetails } = await itemModel.findItemCategory();
        res.json({ itemCategories, itemdetails });
    } catch (error) {
        console.error("Error fetching popupItems:", error);
        res.status(500).json({ message: "getItemCategory Server Error" });
    }
};


// 增加物品大種類的控制器
exports.userAdditemController = (req, res) => {
    const schId = req.params.id; // 獲取預算ID

    const itemData = {
        ItemDetails: req.body.ItemDetails,
        ItemName: req.body.ItemName,
        PrepareStatus: req.body.PrepareStatus,
    };

    itemModel.userAdditemCategory(schId, itemData)
        .then(message => res.status(201).send(message))
        .catch(err => res.status(500).send({ error: err.message }));
};


// 編輯物品細項
exports.updateUseritemDetailsController = async (req, res) => {
    const { sch_id, ItemList_id, Icategory_id, ItemName, ItemDetails, Quantity, PrepareStatus, Total } = req.body;

    try {
        const result = await itemModel.updateUserItemDetails(ItemList_id, {
            sch_id,
            ItemList_id,
            Icategory_id,
            ItemName,
            ItemDetails,
            Quantity,
            PrepareStatus,
            Total
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.json({ message: "Item updated successfully" });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 新增物品細項
exports.userAdditemDetailsController = async (req, res) => {
    const { PrepareStatus, Quantity, sch_id, ItemName, ItemDetails, Total, Icategory_id } = req.body;
    console.log('Received request body:', req.body);

    // 確保 ItemDetails 是必填的
    if (!Array.isArray(ItemDetails) || !ItemDetails.length || !sch_id || !Icategory_id) {
        return res.status(400).json({ message: 'ItemDetails 必须是一个非空数组，sch_id 和 Icategory_id 是必填項目' });
    }

    const newItem = {
        PrepareStatus: PrepareStatus || 0,
        Quantity: Quantity || 0,
        sch_id,
        ItemName: ItemName || '',
        ItemDetails,
        Total: Total || '',
        Icategory_id: req.body.Icategory_id
    };

    console.log('Received data:', newItem);

    try {
        console.log('Trying to add item to the database...');
        const result = await itemModel.userAdditemDetails(newItem); // 呼叫模型的新增方法
        console.log('Item added successfully:', result);

        res.status(201).json({ message: '新增成功', data: { id: result.insertId, ...newItem } });
    } catch (error) {
        console.error('新增失敗', error);
        res.status(500).json({ message: '新增失敗', error: error.message });
    }
};

// 刪除物品細項
exports.deleteUserItemDetailsController = (req, res) => {
    const id = req.params.id;
    const itemListId = req.params.itemListId;

    itemModel.deleteUserItemDetails(id, itemListId)
        .then(result => {
            if (result.affectedRows > 0) {
                res.json({ message: '刪除成功', result });
            } else {
                res.status(404).json({ message: '未找到相應项目' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: '刪除失敗', error: err });
        });
};


// 刪除物品大種類
exports.deleteUserItemAllCategoryController = (req, res) => {
    const id = req.params.id;
    const Icategory_id = req.params.Icategory_id;

    // 先刪除細項
    itemModel.deleteUserItemAllCategory(id, Icategory_id)
        .then(() => {
            res.json({ message: '刪除成功' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: '刪除失敗', error: err });
        });
};