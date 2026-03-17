const csv = require("csv-parser");
const stream = require("stream");
const db = require("../models/nicModel");
const fileModel = require("../models/filesModel");
const { validateNIC } = require("../utils/nicValidator");

exports.processFiles = async (files) => {

  const results = {};

  await Promise.all(
    files.map(file => {

      return new Promise(async (resolve, reject) => {

        try {

          const rows = [];
          const dbPromises = [];

          let totalRecords = 0;
          let validRecords = 0;

          // ✅ Save file first and get ID
          const fileId = await fileModel.saveFile(file.originalname);

          const readable = new stream.Readable();
          readable._read = () => {};
          readable.push(file.buffer);
          readable.push(null);

          readable
            .pipe(csv())

            .on("data", (data) => {

              

              const nic = data.NIC;

              if (!nic) return;
                totalRecords++;
              const validated = validateNIC(nic);

              if (validated) {

                validRecords++;

                const savePromise = db.saveNIC({
                  nic: validated.nic,
                  birthday: validated.birthday,
                  age: validated.age,
                  gender: validated.gender,
                  file_id: fileId
                });

                dbPromises.push(savePromise);
                rows.push(validated);

              }

            })

            .on("end", async () => {

              try {

                // wait all NIC inserts
                await Promise.all(dbPromises);

                // update file record counts
                await fileModel.updateFileCounts(
                  fileId,
                  totalRecords,
                  validRecords
                );

                //results[file.originalname] = rows;
                results[file.originalname] = {
                            totalRecords,
                            validRecords,
                            invalidRecords: totalRecords - validRecords
                          };

                resolve();

              } catch (err) {

                reject(err);

              }

            })

            .on("error", reject);

        } catch (err) {

          reject(err);

        }

      });

    })
  );

  return results;

};