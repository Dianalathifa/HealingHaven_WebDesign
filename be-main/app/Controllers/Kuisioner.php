<?php

namespace App\Controllers;

use App\Models\KuisionerModel;
use App\Models\JawabanModel;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\RESTful\ResourceController;

class Kuisioner extends ResourceController
{
    use ResponseTrait;

    // Method untuk mengambil semua data kuisioner
    public function index()
    {
        $model = new KuisionerModel();
        $data = $model->findAll();

        return $this->respond($data);
    }

    // Method untuk menampilkan detail kuisioner berdasarkan ID
    public function show($id = null)
    {
        $model = new KuisionerModel();
        $data = $model->find($id);

        if (!$data) {
            return $this->failNotFound('No Data Found');
        }

        return $this->respond($data);
    }

    public function getByKategoriId($id_kategori = null)
    {
        $model = new KuisionerModel();
        $data = $model->where('id_kategori', $id_kategori)->findAll();

        if (!$data) {
            return $this->failNotFound('No Data Found');
        }

        return $this->respond($data);
    }

    // Method untuk menambahkan data kuisioner baru
    public function create()
    {
        helper(['form']);

        $rules = [
            'id_kategori' => 'required',
            'pertanyaan' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $data = [
            'id_kategori' => $this->request->getVar('id_kategori'),
            'pertanyaan' => $this->request->getVar('pertanyaan'),
        ];

        $model = new KuisionerModel();
        $model->insert($data);

        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Data Inserted',
            ],
        ];

        return $this->respondCreated($response);
    }

    // Method untuk mengupdate data kuisioner berdasarkan ID
    public function update($id = null)
    {
        helper(['form']);

        $rules = [
            'id_kategori' => 'required',
            'pertanyaan' => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $model = new KuisionerModel();
        $kuisioner = $model->find($id);

        if (!$kuisioner) {
            return $this->failNotFound('No Data Found');
        }

        $data = [
            'id_kategori' => $this->request->getVar('id_kategori'),
            'pertanyaan' => $this->request->getVar('pertanyaan'),
        ];

        $model->update($id, $data);

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Updated',
            ],
        ];

        return $this->respond($response);
    }

    public function delete($id = null)
{
    $model = new KuisionerModel();
    $jawabanModel = new JawabanModel();
    $db = \Config\Database::connect();

    // Mulai transaksi
    $db->transStart();

    try {
        // Hapus semua baris terkait di tabel jawaban yang memiliki id_kuisioner yang sama
        $jawabanModel->where('id_kuisioner', $id)->delete();

        // Hapus baris di tabel kuisioner
        $model->delete($id);

        // Commit transaksi
        $db->transCommit();

        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data Deleted',
            ],
        ];

        return $this->respond($response);
    } catch (\Exception $e) {
        // Jika There is an error, rollback transaksi dan kirim pesan kesalahan
        $db->transRollback();
        return $this->fail($e->getMessage());
    }
}



}